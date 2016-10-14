<?php

session_start();

include_once "db.php";
$GLOBALS['db'] = new DB("studymanag", "localhost", "root", "");
define("DEF_PAR", '__DEFAULT');

//-------------------------------------------------------------------------------------------//
/*
 * ROUTING
 */

if(isset($_GET['action']))
{
    $_a = $_GET['action'];

    /*
     * User management table (users)
     */
    if($_a == 'adduser')
    {
        $fields = array('fname', 'lname', 'username', 'password', 'email', 'phone', 'institution', 'mfofstudy', 'ppic');
        addUser(buildArray($fields, 4));
    }
    else if($_a == 'searchusers')
    {
        //REQUIRED: q=searchstring;
        searchUsers();
    }
    else if($_a == 'login')
    {
        $fields = array('username', 'password');
        login(buildArray($fields));
    }
    else if($_a == 'logout')
    {
        logout();
    }

    /*
     * User info
     */
    else if($_a == 'getstatus')
    {
        getStatus();
    }
    else if($_a == 'getdata')
    {
        getData();
    }

    /*
     * User_contacts table
     */
    else if($_a == 'sendcontactrequest')
    {
        sendContactRequest(buildArray(array('remoteuid')));
    }
    else if($_a == 'confirmrequest')
    {
        confirmRequest();
    }
    else if($_a == 'getcontactrequests')
    {
        getContactRequests();
    }
    else if($_a == 'getcontacts')
    {
        getContacts();
    }
    else if($_a == 'userrelationship')
    {
        if(isset($_GET['ruid']))
        echo userRelationship($_GET['ruid']);
        else ewe('required http argument(s) not provided');
    }

    /*
     * Tasks table
     */
    else if($_a == 'inserttask')
    {
        //Subject field must be an id (not name).
        $fields = array('name', 'type', 'description', 'priority', 'progress', 'finish_before', 'duration', 'start_time', 'subject', 'groupid', 'books', 'url_resources');
        insertTask(buildArray($fields, 1));
    }
    else if($_a == 'deletetask')
    {
        deleteTask(buildArray(array('id')));
    }
    else if($_a == 'getindependenttasks')
    {
        //REQUIRED: none; others optional; Also, subject field must be an id (not name).
        $fields = array('id', 'name', 'type', 'priority', 'progress', 'finish_before', 'duration', 'start_time', 'subject');
        getIndependentTasks($fields);
    }
    else if($_a == 'searchindependenttasks')
    {
        //REQUIRED: q=searchstring;
        searchIndependentTasks();
    }
    else if($_a == 'updatetask')
    {
        //REQUIRED: id=taskid; others optional; Also, subject field must be an id (not name).
        $fields = array('name', 'type', 'description', 'priority', 'progress', 'finish_before', 'duration', 'start_time', 'subject', 'books', 'url_resources', 'groupid');
        updateTask($fields);
    }
    else if($_a == 'getgrouptasks')
    {
        if(isset($_GET['groupid']))
            getGroupTasks($_GET['groupid']);
        else ewe('required http argument(s) not provided');
    }
    else if($_a == 'addtasktogroup')
    {
        if(isset($_GET['taskid']) && isset($_GET['taskid']))
            addTaskToGroup($_GET['taskid'], $_GET['groupid']);
        else ewe('required http argument(s) not provided');
    }

    /*
     * User_subjects table
     */
    else if($_a == 'addsubject')
    {
        addSubject(buildArray(array('name', 'description', 'coverimg'), 1));
    }
    else if($_a == 'getsubjects')
    {
        //REQUIRED: none; OPTIONAL: userid=id;
        getSubjects();
    }

    //Group_members table
    else if($_a == 'sendgrouprequest')
    {
        //REQUIRED: EITHER groupid only(must be group of a contact) OR both userid(must be a contact) and groupid. NOT BOTH
        sendGroupRequest();
    }
    else if($_a == 'confirmgroup')
    {
        //REQUIRED: reqid=requestid; OPTIONAL: r=0/1 (default 1 for true->confirm request);
        confirmGroup();
    }

    /*
     * Group table
     */
    else if($_a == 'creategroup')
    {
        $fields = array('name', 'type', 'description', 'coverimg', 'subject');
        createGroup(buildArray($fields, 1));
    }
    else if($_a == 'deletegroup')
    {
        //REQUIRED: id=groupid;
        deleteGroup();
    }
    else if($_a == 'updategroup')
    {
        //REQUIRED: id=groupid; others optional; Also, subject field must be an id (not name).
        $fields = array('name', 'type', 'description', 'cover_img', 'subject');
        updateGroup($fields);
    }
    else if($_a == 'getowngroups')
    {
        //REQUIRED: id=groupid;
        getOwnGroups();
    }
    else if($_a == 'getmembergroups')
    {
        //REQUIRED: id=groupid;
        getMemberGroups();
    }

}



//-------------------------------------------------------------------------------------------//
/*
 * GET methods
 */

//Groups table
function createGroup($data)
{
    confirmAuth();
    $uid = $_SESSION['userid'];
    $subject = $data[4];

    $res = $GLOBALS['db']->simpleRead('groups', $data[0], 'name', 'id', "AND user_admin_id = $uid");
    if(!empty($res))
        ewe('task already existing for this user');

    //Make sure that the subject and group is within the user's allowed range
    if($subject !== DEF_PAR)
    {
        $res = $GLOBALS['db']->simpleRead('user_subjects', $subject, 'id', 'id', "AND userid = $uid");
        if(empty($res)) ewe('external constraints failed');
    }

    $groupData = array(NULL, $uid);
    $groupData = array_merge($groupData, $data);
    $groupData[] = date('Y-m-d H:i:s');

    $res = $GLOBALS['db']->simpleWrite('groups', $groupData);
    if($res === FALSE)
        ewe('database error');
}

function getOwnGroups()
{
    confirmAuth();
    $uid = $_SESSION['userid'];

    $res = $GLOBALS['db']->simpleRead('groups', $uid, 'user_admin_id');
    if($res === FALSE)
        ewe('database error');

    echo json_encode($res);
}

function getMemberGroups()
{
    confirmAuth();
    $uid = $_SESSION['userid'];

    $sql = "SELECT * FROM groups INNER JOIN group_members ON groups.id = groupid WHERE memberid = $uid AND confirmed = 1";
    $res = $GLOBALS['db']->read($sql);

    if($res === FALSE)
        ewe('database error');

    echo json_encode($res);
}

function deleteGroup()
{
    confirmAuth();
    $uid = $_SESSION['userid'];

    if(isset($_GET['id']))
    {
        $groupid = $_GET['id'];
        $sql = "DELETE FROM groups WHERE id = ? AND user_admin_id = $uid";

        $res = $GLOBALS['db']->modify($sql, array($groupid));
        if($res === FALSE)
            ewe('database error');

        if($res == 0) ewe("no changes made, or no matching group-user combination found");
    }
    else ewe('required http argument(s) not provided');
}

function updateGroup($data)
{
    confirmAuth();

    if(isset($_GET['id']) && !empty($_GET['id']))
    {
        $gid = $_GET['id'];
        $uid = $_SESSION['userid'];
        $sql = "UPDATE groups SET ";

        $groupData = array();

        for($i = 0; $i < count($data); $i++)
        {
            if(isset($_GET[$data[$i]]) && !empty($_GET[$data[$i]]))
            {
                $dataValue = addslashes($_GET[$data[$i]]);

                //Make sure that the subject and group is within the user's allowed range
                if($data[$i] == 'subject')
                {
                    if($dataValue !== DEF_PAR)
                    {
                        $res = $GLOBALS['db']->simpleRead('user_subjects', $dataValue, 'id', 'id', "AND userid = $uid");
                        if(empty($res)) ewe('external constraints failed');
                        $sql .= " {$data[$i]} = ?,";
                        $groupData[] = $dataValue;
                    }
                    else
                    {
                        $sql .= " {$data[$i]} = DEFAULT,";
                    }
                }
                else
                {
                    $sql .= " {$data[$i]} = ?,";
                    $groupData[] = $dataValue;
                }

            }
        }

        if($sql == "UPDATE groups SET ") ewe('no data provided');

        $sql = substr($sql, 0, -1);
        $sql .= " WHERE id = ? AND user_admin_id = $uid";
        $groupData[] = $gid;

        $res = $GLOBALS['db']->modify($sql, $groupData);
        if($res === FALSE) ewe("database error!");

        if($res == 0) ewe("no changes made, or no matching group-user combination found");
    }
    else ewe('group id not provided');
}

//Group_members table
function sendGroupRequest()
{
    confirmAuth();
    $uid = $_SESSION['userid'];

    if(isset($_GET['groupid']))
    {
        $gid = $_GET['groupid'];

        //Admin requests a contact to join group
        if(isset($_GET['userid']))
        {
            $ruserid = $_GET['userid'];

            if(userRelationship($ruserid) != 2)
                ewe('The requested user is not part of your contacts');

            $res = $GLOBALS['db']->simpleRead('groups', $gid, 'id', 'id', "AND user_admin_id = $uid");
            if($res === FALSE)
                ewe('database error');
            if(empty($res))
                ewe('group doesn\'t exist, or group not created by this user');

            $res = $GLOBALS['db']->simpleWrite('group_members', array(NULL, $ruserid, $gid, '1', '__DEFAULT'));
            if($res === FALSE)
                ewe('database error, or user already has request for joining group');
        }

        //Contact requests admin to join group based on groups of contacts list
        else {
            $res = $GLOBALS['db']->simpleRead('groups', $gid, 'id', 'user_admin_id');
            if($res === FALSE)
                ewe('database error');

            if (empty($res))
                ewe('the requested group doesn\'t exist');

            $gadminid = $res[0]['user_admin_id'];
            if (userRelationship($gadminid) != 2)
                ewe('the administrator of the requested group is not part of your contacts');

            $res = $GLOBALS['db']->simpleWrite('group_members', array(NULL, $uid, $gid, '0', '__DEFAULT'));
            if($res === FALSE)
                ewe('database error, or user already has request for joining group');
        }
    }
    else ewe('required http argument(s) not provided');
}

function confirmGroup()
{
    confirmAuth();
    $uid = $_SESSION['userid'];

    if(isset($_GET['reqid'])) {
        $rid = $_GET['reqid'];
        $response = true;

        $res = $GLOBALS['db']->simpleRead('group_members', $rid);
        if(empty($res)) ewe('no request found');

        $memberid = $res[0]['memberid'];
        $groupid = $res[0]['groupid'];
        $sentbyadmin = $res[0]['sentbyadmin'];

        if (isset($_GET['r'])) {
            if ($_GET['r'] == '0' || $_GET['r'] == 'false')
                $response = false;
        }

        if($sentbyadmin == '1') {
            if ($response == TRUE)
            {
                $sql = "UPDATE group_members SET confirmed = 1 WHERE groupid = ? AND memberid = $uid";
                $res = $GLOBALS['db']->modify($sql, array($groupid));
                if ($res === FALSE)
                    ewe('database error, or user already has request for joining group');
            }
            else if ($response == FALSE)
            {
                $sql = "DELETE FROM group_members WHERE groupid = ? AND memberid = $uid AND confirmed = false";
                $res = $GLOBALS['db']->modify($sql, array($groupid));
                if ($res === FALSE)
                    ewe('database error, or user already has request for joining group');
            }
        }
        else if($sentbyadmin == '0') {
            $sql = "SELECT user_admin_id FROM groups INNER JOIN group_members ON groups.id = groupid WHERE group_members.id = ?";
            $res = $GLOBALS['db']->read($sql, array($rid));

            if(empty($res)) ewe('db error');

            $uadminid = $res[0]['user_admin_id'];
            if($uid != $uadminid) ewe('not authorized');

            if ($response == TRUE)
            {
                $sql = "UPDATE group_members SET confirmed = 1 WHERE groupid = ? AND memberid = $memberid";
                $res = $GLOBALS['db']->modify($sql, array($groupid));
                if ($res === FALSE)
                    ewe('database error, or user already has request for joining group');
            }
            else if ($response == FALSE)
            {
                $sql = "DELETE FROM group_members WHERE groupid = ? AND memberid = $memberid AND confirmed = false";
                $res = $GLOBALS['db']->modify($sql, array($groupid));
                if ($res === FALSE)
                    ewe('database error, or user already has request for joining group');
            }
        }
    }
    else ewe('required http argument(s) not provided');
}

function getRequests()
{
    confirmAuth();
    $uid = $_SESSION['userid'];


}

//User management table (users)
function addUser($userData)
{
    if(isset($_SESSION['userid']))
        ewe("already logged in");

    $usersWithGivenName = $GLOBALS['db']->simpleRead('users', $userData[2], 'username');
    if(!empty($usersWithGivenName))
        ewe("user already exists");

    $data = array('DEFAULT');
    $data = array_merge($data, $userData);
    $data[4] = sha1($data[4]);
    $data[] = date('Y-m-d H:i:s');

    $res = $GLOBALS['db']->simpleWrite('users', $data);

    if($res === FALSE)
        ewe('database error');
}

function searchUsers()
{
    confirmAuth();

    if(!isset($_GET['q']))
        ewe('required http argument(s) not provided');

    $str = "%{$_GET['q']}%";

    $sql = "SELECT * FROM users WHERE CONCAT_WS(' ', fname, lname) LIKE ? or username LIKE ?";
    $res = $GLOBALS['db']->read($sql, array($str, $str));

    if($res === FALSE)
        ewe('database error');

    echo json_encode($res);
}

function login($data)
{
    if(isset($_SESSION['userid']))
        ewe("already logged in");

        $data[1] = sha1($data[1]);
        $sql = "SELECT id, username, fname, lname FROM users WHERE username = ? AND password = ?";

        $res = $GLOBALS['db']->read($sql, $data);
        if($res === FALSE) ewe("database error!");

        //If a match was found.
        if (!empty($res))
        {
            $_SESSION['userid'] = $res[0]['id'];

            //Return some info
            echo json_encode($res[0]);
        }
        else
        {
            ewe("authentication failed. no match found for this combination of username and password.");
        }
}

function logout()
{
    if (isset($_SESSION['userid']))
    {
        session_unset();
        session_destroy();
    }
    else
    {
        ewe("not logged in");
    }
}

//User_contacts table
function sendContactRequest($remoteUserData){
    confirmAuth();

    $uid = $_SESSION['userid'];
    $rid = $remoteUserData[0];

    if($uid == $rid)
        ewe("y u send request to yourself?! u have no friends?!");

    $sql = "SELECT user1id FROM user_contacts WHERE (user1id = ? AND user2id = ?) OR (user2id = ? AND user1id = ?)";
    $data = array($uid, $rid);

    $res = $GLOBALS['db']->read($sql, array_merge($data, $data));

    if(!empty($res))
        ewe('request already sent');

    $data = array('DEFAULT', $uid, $rid, 0);
    $res = $GLOBALS['db']->simpleWrite('user_contacts', $data);
    if($res === FALSE) ewe("database error!");
}

function confirmRequest()
{
    confirmAuth();

    $uid = $_SESSION['userid'];
    $accept = true;

    if(!isset($_GET['id'])) ewe('required http argument(s) not provided');
    $reqid = $_GET['id'];

    if(isset($_GET['r']))
    {
        $r = $_GET['r'];
        if($r == 0 || $r == 'false')
            $accept = false;
    }

    if($accept == true) {
        $sql = "UPDATE user_contacts SET confirmed = 1 WHERE id = ? AND user2id = $uid";
        $res = $GLOBALS['db']->modify($sql, array($reqid));

        if (empty($res))
            ewe('no match found || not authorized');

        if ($res === FALSE) ewe("database error!");
    }
    else if($accept == false)
    {
        $sql = "DELETE FROM user_contacts WHERE id = ? AND user2id = $uid AND confirmed = 1";
        $res = $GLOBALS['db']->modify($sql, array($reqid));

        if (empty($res))
            ewe('no match found || not authorized');

        if ($res === FALSE) ewe("database error!");
    }
}

function getContactRequests()
{
    confirmAuth();

    $res = $GLOBALS['db']->simpleRead('user_contacts', $_SESSION['userid'], 'user2id', '*', "AND confirmed = 0");

    if($res === FALSE) ewe("database error!");
    echo json_encode($res);
}

function getContacts()
{
    confirmAuth();
    $uid = $_SESSION['userid'];

    $sql = "SELECT users.id, fname, lname, username, email FROM users INNER JOIN user_contacts ON users.id = user_contacts.user2id WHERE user1id = $uid AND confirmed = 1";
    $res = $GLOBALS['db']->read($sql);

    if($res === FALSE) ewe("database error!");
    echo json_encode($res);
}

//User info&management
function getStatus()
{
    if(isset($_SESSION['userid']))
        echo json_encode(array("status" => 1));
    else echo json_encode(array("status" => 0));
}

function getData()
{
    confirmAuth();

    $res = $GLOBALS['db']->simpleRead('users', $_SESSION['userid'], 'id', 'id, fname, lname, username, email, phone, institution, main_field_of_study, profile_pic, registration_date');

    if($res === FALSE) ewe("database error!");
    echo json_encode($res);
}

//Tasks table
function insertTask($taskData)
{
    confirmAuth();

    $name = $taskData[0];
    $subject = $taskData[8];
    $uid = $_SESSION['userid'];

    $res = $GLOBALS['db']->simpleRead('tasks', $name, 'name', 'id', "AND userid = ".$_SESSION['userid']);
    if(!empty($res))
        ewe('task already existing for this user');

    //Make sure that the subject and group is within the user's allowed range
    if($subject !== DEF_PAR)
    {
        $res = $GLOBALS['db']->simpleRead('user_subjects', $subject, 'id', 'id', "AND userid = $uid");
        if(empty($res)) ewe('external constraints failed');
    }

    $data = array(NULL, $_SESSION['userid']);
    $data = array_merge($data, $taskData);
    $data[] = date('Y-m-d H:i:s');
    $data[] = date('Y-m-d H:i:s');

    $res = $GLOBALS['db']->simpleWrite('tasks', $data);

    if($res === FALSE) ewe("database error!");

    $id = $GLOBALS['db']->lastInsertedId();
    $res = $GLOBALS['db']->simpleRead('tasks', $id);

    if($res === FALSE) ewe("[task inserted but cannot return] database error!");

    echo json_encode($res);
}

function deleteTask($data)
{
    confirmAuth();

    $uid = $_SESSION['userid'];

    $sql = "DELETE FROM tasks WHERE id = ? AND userid = $uid";
    $res = $GLOBALS['db']->modify($sql, $data);

    if($res === FALSE) ewe("database error!");
}

function updateTask($data)
{
    confirmAuth();

    if(isset($_GET['id']) && !empty($_GET['id']))
    {
        $tid = $_GET['id'];
        $uid = $_SESSION['userid'];
        $sql = "UPDATE tasks SET ";

        $taskData = array();

        for($i = 0; $i < count($data); $i++)
        {
            if(isset($_GET[$data[$i]]) && !empty($_GET[$data[$i]]))
            {
                $dataValue = addslashes($_GET[$data[$i]]);

                //Make sure that the subject and group is within the user's allowed range
                if($data[$i] == 'subject')
                {
                    if($dataValue !== DEF_PAR)
                    {
                        $res = $GLOBALS['db']->simpleRead('user_subjects', $dataValue, 'id', 'id', "AND userid = $uid");
                        if(empty($res)) ewe('external constraints failed');
                        $sql .= " {$data[$i]} = ?,";
                        $taskData[] = $dataValue;
                    }
                    else
                    {
                        $sql .= " {$data[$i]} = DEFAULT,";
                    }
                }
                else
                {
                    $sql .= " {$data[$i]} = ?,";
                    $taskData[] = $dataValue;
                }

            }
        }

        if($sql == "UPDATE tasks SET ") ewe('no data provided');

        $sql = substr($sql, 0, -1);
        $sql .= " WHERE id = ? AND userid = $uid";
        $taskData[] = $tid;

        $res = $GLOBALS['db']->modify($sql, $taskData);
        if($res == 0) ewe("no changes made, or no matching group-user combination found");

        if($res === FALSE) ewe("database error!");

    }
    else ewe('task id not provided');
}

function getIndependentTasks($data)
{
    confirmAuth();
    $uid = $_SESSION['userid'];

    $sql = "SELECT * FROM tasks WHERE userid = $uid AND groupid IS NULL ";
    $taskData = array();

    for($i = 0; $i < count($data); $i++)
    {
        if(isset($_GET[$data[$i]]) && !empty($_GET[$data[$i]]))
        {
            $dataValue = $_GET[$data[$i]];
            $sql .= "AND {$data[$i]} = ? ";
            $taskData[] = $dataValue;
        }
    }

    $res = $GLOBALS['db']->read($sql, $taskData);
    if($res === FALSE) ewe("database error!");

    echo json_encode($res);
}

function searchIndependentTasks(){
    confirmAuth();
    $uid = $_SESSION['userid'];

    if(!isset($_GET['q']))
        ewe('required http argument(s) not provided');

    $str = "%{$_GET['q']}%";

    $sql = "SELECT * FROM tasks WHERE (name LIKE ? OR description LIKE ? OR type LIKE ?) AND userid= $uid";
    $data = array($str, $str, $str);

    $res = $GLOBALS['db']->read($sql, $data);
    if($res === FALSE) ewe("database error!");

    echo json_encode($res);
}

function getGroupTasks($gid)
{
    confirmAuth();

    $res = $GLOBALS['db']->simpleRead('tasks', $gid, 'groupid');
    if($res === FALSE) ewe("database error!");

    echo json_encode($res);
}

function addTaskToGroup($tid, $gid)
{
    confirmAuth();
    $uid = $_SESSION['userid'];

    $sql = "UPDATE tasks SET groupid = ? WHERE id = ? AND userid = $uid";
    $res = $GLOBALS['db']->modify($sql, array($gid, $tid));

    if($res === FALSE) ewe("database error!");
}

//User_subjects table
function addSubject($subData)
{
    confirmAuth();

    $uid = $_SESSION['userid'];
    $data = array(NULL, $uid);
    $data = array_merge($data, $subData);

    $res = $GLOBALS['db']->simpleRead('user_subjects', $subData[0], 'name', 'id', "AND userid = $uid");
    if(!empty($res))
        ewe('a subject with this name already exists for this user');

    $res = $GLOBALS['db']->simpleWrite('user_subjects', $data);
    if($res === FALSE) ewe("database error!");
}

function getSubjects()
{
    confirmAuth();

    if(!isset($_GET['userid']))
    {
        $uid = $_SESSION['userid'];
    }
    else
    {
        $uid = $_GET['userid'];
        if(userRelationship($uid) != 2)
            ewe('you cannot view the subjects of this user');
    }

    $res = $GLOBALS['db']->simpleRead('user_subjects', $uid, 'userid');
    if($res === FALSE) ewe("database error!");

    echo json_encode($res);
}

//-------------------------------------------------------------------------------------------//
/*
 * HELPER methods
 */

function ewe($msg, $data = NULL)
{
    if ($data === NULL)
        die(json_encode(array("error" => $msg)));
    die(json_encode(array("error" => $msg, "data" => $data)));
}

function ews($msg, $data = NULL)
{
    if ($data === NULL)
        die(json_encode(array("success" => $msg)));
    die(json_encode(array("success" => $msg, "data" => $data)));
}

//Returns not authorized error message and stops script execution.
function confirmAuth()
{
    if (!isset($_SESSION['userid']))
        ewe("not authorized");
}

//Returns true if specified id is (confirmed) your friend
function userRelationship($rid)
{
    confirmAuth();

    $uid = $_SESSION['userid'];

    if($uid == $rid)
        return -1;

    $sql = "SELECT user1id FROM user_contacts WHERE ((user1id = ? AND user2id = ?) OR (user2id = ? AND user1id = ?)) AND confirmed = 1";
    $res = $GLOBALS['db']->read($sql, array($uid, $rid, $uid, $rid));

    if(!empty($res))
        return 2;

    $sql = "SELECT user1id FROM user_contacts WHERE ((user1id = ? AND user2id = ?) OR (user2id = ? AND user1id = ?)) AND confirmed = 0";
    $res = $GLOBALS['db']->read($sql, array($uid, $rid, $uid, $rid));

    if(!empty($res))
        return 1;

    return 0;
}

//Builds an array with data to be inserted into the neccessary method.
function buildArray($fields, $required = NULL, $method = 'GET')
{
    if($required === NULL)
        $required = count($fields);

    $data = array();

    if($method == 'GET')
    {
        for ($i = 0; $i < count($fields); $i++)
        {
            if (!isset($_GET[$fields[$i]]))
            {
                if ($i < $required)
                    ewe('required http argument(s) not provided');
                $data[] = '__DEFAULT';
            }
            else if (empty($_GET[$fields[$i]]))
            {
                if ($i < $required)
                    ewe('required http argument(s) empty');
                $data[] = '__DEFAULT';
            }
            else
            {
                $data[] = $_GET[$fields[$i]];
            }
        }
    }

    else if($method == 'POST')
    {
        for ($i = 0; $i < count($fields); $i++)
        {
            if (!isset($_POST[$fields[$i]]))
            {
                if ($i < $required)
                    ewe('required http argument(s) not provided');
                $data[] = '__DEFAULT';
            }
            else if (empty($_POST[$fields[$i]]))
            {
                if ($i < $required)
                    ewe('required http argument(s) empty');
                $data[] = '__DEFAULT';
            }
            else
            {
                $data[] = $_POST[$fields[$i]];
            }
        }
    }

    return $data;
}
?>


