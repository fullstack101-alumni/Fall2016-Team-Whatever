-- phpMyAdmin SQL Dump
-- version 4.3.11
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Oct 12, 2016 at 12:18 AM
-- Server version: 5.6.24
-- PHP Version: 5.6.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `studymanag`
--

CREATE DATABASE `studymanag`;
USE `studymanag`;

-- --------------------------------------------------------

--
-- Table structure for table `groups`
--

CREATE TABLE IF NOT EXISTS `groups` (
  `id` int(10) unsigned NOT NULL,
  `user_admin_id` int(10) unsigned NOT NULL,
  `type` set('group project','personal project','learning obejctive','other') DEFAULT 'other',
  `name` varchar(128) NOT NULL,
  `description` varchar(256) DEFAULT NULL,
  `cover_img` varchar(512) DEFAULT NULL,
  `subject` varchar(128) DEFAULT NULL,
  `creation_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `group_members`
--

CREATE TABLE IF NOT EXISTS `group_members` (
  `id` int(10) unsigned NOT NULL,
  `memberid` int(10) unsigned NOT NULL,
  `confirmed` tinyint(1) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `tasks`
--

CREATE TABLE IF NOT EXISTS `tasks` (
  `id` int(10) unsigned NOT NULL,
  `userid` int(10) unsigned NOT NULL,
  `name` varchar(64) NOT NULL,
  `type` set('reading','practicing','problem solving','test preparation','subtask','other') NOT NULL DEFAULT 'other',
  `description` varchar(256) DEFAULT NULL,
  `priority` set('1','2','3','4','5') NOT NULL DEFAULT '1',
  `progress` set('0','1','2') NOT NULL DEFAULT '0',
  `finish_before` datetime DEFAULT NULL,
  `duration` datetime DEFAULT NULL,
  `start_time` datetime DEFAULT NULL,
  `subject` int(11) unsigned DEFAULT NULL,
  `groupid` int(10) unsigned DEFAULT NULL,
  `books` varchar(1024) DEFAULT NULL,
  `url_resources` varchar(4096) DEFAULT NULL,
  `item_creation_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tasks`
--

INSERT INTO `tasks` (`id`, `userid`, `name`, `type`, `description`, `priority`, `progress`, `finish_before`, `duration`, `start_time`, `subject`, `groupid`, `books`, `url_resources`, `item_creation_time`) VALUES
(1, 3, 't1', 'other', NULL, '1', '0', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2016-10-11 21:37:33'),
(2, 3, 'testtt', 'other', NULL, '1', '0', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2016-10-11 21:17:45');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `id` int(10) unsigned NOT NULL,
  `fname` varchar(64) NOT NULL,
  `lname` varchar(64) NOT NULL,
  `username` varchar(64) NOT NULL,
  `password` char(40) NOT NULL,
  `email` varchar(128) DEFAULT NULL,
  `phone` varchar(13) DEFAULT NULL,
  `institution` varchar(128) DEFAULT NULL,
  `main_field_of_study` varchar(128) DEFAULT NULL,
  `profile_pic` varchar(256) DEFAULT NULL,
  `registration_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `fname`, `lname`, `username`, `password`, `email`, `phone`, `institution`, `main_field_of_study`, `profile_pic`, `registration_date`) VALUES
(1, 'fn', 'ln', 'test', '1234', NULL, NULL, NULL, NULL, NULL, '2016-10-11 13:24:10'),
(2, 'fn', 'ln', 'test2', '1234', NULL, NULL, NULL, NULL, NULL, '2016-10-11 13:25:00'),
(3, 'fn', 'ln', 'test3', '7110eda4d09e062aa5e4a390b0a572ac0d2c0220', NULL, NULL, NULL, NULL, NULL, '2016-10-11 13:26:09'),
(4, 'fn', 'ln', 'test4', '7110eda4d09e062aa5e4a390b0a572ac0d2c0220', NULL, NULL, NULL, NULL, NULL, '2016-10-11 13:26:29'),
(5, 'te', 'st', 'test1222678', '7110eda4d09e062aa5e4a390b0a572ac0d2c0220', NULL, NULL, NULL, NULL, NULL, '2016-10-11 21:03:31');

-- --------------------------------------------------------

--
-- Table structure for table `user_contacts`
--

CREATE TABLE IF NOT EXISTS `user_contacts` (
  `id` int(10) unsigned NOT NULL,
  `user1id` int(10) unsigned NOT NULL,
  `user2id` int(10) unsigned NOT NULL,
  `confirmed` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `user_contacts`
--

INSERT INTO `user_contacts` (`id`, `user1id`, `user2id`, `confirmed`) VALUES
(1, 3, 2, 0),
(2, 3, 4, 1);

-- --------------------------------------------------------

--
-- Table structure for table `user_subjects`
--

CREATE TABLE IF NOT EXISTS `user_subjects` (
  `id` int(10) unsigned NOT NULL,
  `userid` int(10) unsigned NOT NULL,
  `name` varchar(128) NOT NULL,
  `description` varchar(256) DEFAULT NULL,
  `cover_img` varchar(256) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `groups`
--
ALTER TABLE `groups`
  ADD PRIMARY KEY (`id`), ADD UNIQUE KEY `id` (`id`), ADD KEY `user_admin_id` (`user_admin_id`);

--
-- Indexes for table `group_members`
--
ALTER TABLE `group_members`
  ADD PRIMARY KEY (`id`), ADD UNIQUE KEY `id` (`id`), ADD KEY `memberid` (`memberid`);

--
-- Indexes for table `tasks`
--
ALTER TABLE `tasks`
  ADD PRIMARY KEY (`id`), ADD UNIQUE KEY `id` (`id`), ADD KEY `userid` (`userid`), ADD KEY `subject` (`subject`), ADD KEY `group` (`groupid`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`), ADD UNIQUE KEY `id` (`id`), ADD UNIQUE KEY `username` (`username`);

--
-- Indexes for table `user_contacts`
--
ALTER TABLE `user_contacts`
  ADD PRIMARY KEY (`id`), ADD UNIQUE KEY `id` (`id`), ADD KEY `user1id` (`user1id`), ADD KEY `user2id` (`user2id`);

--
-- Indexes for table `user_subjects`
--
ALTER TABLE `user_subjects`
  ADD PRIMARY KEY (`id`), ADD UNIQUE KEY `id` (`id`), ADD KEY `userid` (`userid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `groups`
--
ALTER TABLE `groups`
  MODIFY `id` int(10) unsigned NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `group_members`
--
ALTER TABLE `group_members`
  MODIFY `id` int(10) unsigned NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `tasks`
--
ALTER TABLE `tasks`
  MODIFY `id` int(10) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(10) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT for table `user_contacts`
--
ALTER TABLE `user_contacts`
  MODIFY `id` int(10) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `user_subjects`
--
ALTER TABLE `user_subjects`
  MODIFY `id` int(10) unsigned NOT NULL AUTO_INCREMENT;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `groups`
--
ALTER TABLE `groups`
ADD CONSTRAINT `userid1` FOREIGN KEY (`user_admin_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `group_members`
--
ALTER TABLE `group_members`
ADD CONSTRAINT `userid2` FOREIGN KEY (`memberid`) REFERENCES `users` (`id`);

--
-- Constraints for table `tasks`
--
ALTER TABLE `tasks`
ADD CONSTRAINT `groupid1` FOREIGN KEY (`groupid`) REFERENCES `groups` (`id`),
ADD CONSTRAINT `subjectid1` FOREIGN KEY (`subject`) REFERENCES `user_subjects` (`id`),
ADD CONSTRAINT `userid3` FOREIGN KEY (`userid`) REFERENCES `users` (`id`);

--
-- Constraints for table `user_contacts`
--
ALTER TABLE `user_contacts`
ADD CONSTRAINT `userid4` FOREIGN KEY (`user1id`) REFERENCES `users` (`id`),
ADD CONSTRAINT `userid5` FOREIGN KEY (`user2id`) REFERENCES `users` (`id`);

--
-- Constraints for table `user_subjects`
--
ALTER TABLE `user_subjects`
ADD CONSTRAINT `userid6` FOREIGN KEY (`userid`) REFERENCES `users` (`id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
