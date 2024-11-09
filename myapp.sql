-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 09, 2024 at 04:12 PM
-- Server version: 9.0.1
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `myapp`
--

-- --------------------------------------------------------

--
-- Table structure for table `issues`
--

CREATE TABLE `issues` (
  `issue_id` int NOT NULL,
  `user_id` int DEFAULT NULL,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `status_id` int NOT NULL DEFAULT '1',
  `priority` int DEFAULT '1',
  `assigned_to` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `issues`
--

INSERT INTO `issues` (`issue_id`, `user_id`, `title`, `description`, `created_at`, `status_id`, `priority`, `assigned_to`) VALUES
(1, 1, 'aaaa', 'ssss', '2024-10-23 12:33:58', 1, 1, NULL),
(2, 3, 'คอมพัง', 'ชั้น 5', '2024-10-23 14:44:21', 3, 2, NULL),
(6, 1, 'เน็ตล่ม', 'ชั้น3', '2024-10-23 14:53:52', 1, 1, NULL),
(9, 3, 'ss', 'ss', '2024-10-24 14:50:51', 1, 1, NULL),
(12, 4, 'asd', 'asdasd', '2024-10-24 14:57:01', 1, 1, NULL),
(14, 2, 'ระบบขัดข้อง', 'เชื่อมต่อคอมไม่ได้', '2024-10-26 13:53:36', 1, 2, NULL),
(15, 1, 'สายไฟขาด', 'ห้อง1', '2024-10-28 16:36:35', 6, 3, 'Helpdesk1'),
(16, 2, '11', '22', '2024-10-28 18:08:47', 1, 1, NULL),
(17, 1, 'จอเสีย', 'ที่ห้อง10', '2024-10-31 11:28:06', 1, 1, NULL),
(18, 1, 'จอเปิดไม่ติด', 'ห้อง 303', '2024-10-31 17:53:18', 6, 2, 'Helpdesk4'),
(19, 1, 'โต๊ะพัง', 'ห้อง111', '2024-11-01 15:17:21', 6, 2, 'Helpdesk5'),
(20, 1, 'จอแตก', 'ห้อง01', '2024-11-01 15:31:10', 6, 3, 'Helpdesk3'),
(21, 1, 'ต่อเน็ตไม่ได้', 'ห้อง001', '2024-11-04 18:16:37', 6, 3, 'Helpdesk5'),
(22, 1, 'อุปกรณ์ใช้ไม่ได้', 'ห้อง5', '2024-11-04 18:32:02', 6, 1, 'Helpdesk2'),
(23, 1, 'เมาส์พัง', 'ห้อง00', '2024-11-05 07:15:28', 1, 1, NULL),
(24, 1, 'เก้าอี้หัก', 'ห้อง50', '2024-11-08 12:52:15', 6, 1, 'Helpdesk4'),
(25, 3, 'เน็ตเสีย', 'ห้อง1101', '2024-11-08 14:26:58', 3, 2, NULL),
(26, 1, 'จอแตก', 'ห้อง109', '2024-11-08 15:13:02', 6, 3, 'Helpdesk2'),
(27, 1, 'เมาส์พัง', 'ห้อง0000', '2024-11-08 16:33:35', 1, 1, NULL),
(28, 1, 'แอร์พัง', 'ห้อง77', '2024-11-08 18:10:27', 6, 3, 'Helpdesk1'),
(29, 1, 'server ล่ม', 'ห้อง server', '2024-11-09 13:13:34', 1, 1, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `issue_messages`
--

CREATE TABLE `issue_messages` (
  `message_id` int NOT NULL,
  `issue_id` int NOT NULL,
  `message` text NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `issue_messages`
--

INSERT INTO `issue_messages` (`message_id`, `issue_id`, `message`, `created_at`) VALUES
(1, 14, 'จะทำการแก้ไขให้', '2024-10-26 16:31:51'),
(3, 15, 'กำลังแก้ไข', '2024-10-28 16:57:40'),
(4, 6, 'กำลังแก้ไข', '2024-10-28 18:15:37'),
(5, 1, 'กำลังดำเนินการ', '2024-11-01 08:40:04'),
(6, 2, 'กำลังดำเนินการ', '2024-11-01 08:51:04'),
(7, 6, 'ดำเนินการแก้ไขอยู่', '2024-11-01 14:50:30'),
(8, 6, 'ดำเนินการแก้ไขเสร็จแล้ว', '2024-11-01 14:51:39'),
(9, 17, 'เดี๋ยวเข้าไปแก้ไขให้', '2024-11-01 14:54:46'),
(10, 19, 'จะดำเนินการแก้ไขให้', '2024-11-01 15:19:47'),
(11, 19, 'กำลังดำเนินการอยู่', '2024-11-01 15:20:49'),
(12, 19, 'ดำนเนิการเสร็จสิ้นแล้ว', '2024-11-01 15:21:02'),
(13, 20, 'จะดำเนินการให้', '2024-11-01 15:33:41'),
(14, 20, 'กำลังดำเนินการ', '2024-11-01 15:34:28'),
(15, 20, 'ดำเนินการแก้ไขแล้ว', '2024-11-01 15:35:24'),
(16, 20, 'ดำเนินการเสร็จสิ้นเรียบร้อย', '2024-11-01 15:39:22'),
(17, 15, 'จะดำเนินการให้', '2024-11-02 12:19:05'),
(18, 15, 'กำลังดำเนินการ', '2024-11-02 12:19:26'),
(19, 15, 'ดำเนินการแล้ว', '2024-11-02 12:19:35'),
(20, 15, 'ดำเนินการเสร็จสิ้นเรียบร้อย', '2024-11-02 12:19:58'),
(21, 18, 'จะดำเนินการให้', '2024-11-02 12:48:38'),
(22, 18, 'กำลังดำเนินการ', '2024-11-02 12:48:59'),
(23, 18, 'ดำเนินการแล้ว', '2024-11-02 12:49:21'),
(24, 18, 'ดำเนินการเรียบร้อยแล้ว', '2024-11-02 12:49:43'),
(25, 21, 'จะทำการแก้ไขให้', '2024-11-04 18:23:24'),
(26, 21, 'กำลังดำเนินการให้', '2024-11-04 18:23:42'),
(27, 21, 'ดำเนินการให้แล้ว', '2024-11-04 18:24:06'),
(28, 22, 'จะดำเนินการให้', '2024-11-04 18:48:06'),
(29, 22, 'กำลังดำเนินการ', '2024-11-04 18:48:15'),
(30, 22, 'ดำเนินการเสร็จสิ้น', '2024-11-04 18:48:59'),
(31, 2, 'จะดำเนินการให้', '2024-11-05 07:24:46'),
(32, 24, 'จะดำเนินการซ่อมให้', '2024-11-08 12:53:22'),
(33, 24, 'กำลังซ่อมแซม', '2024-11-08 12:54:06'),
(34, 24, 'ซ่อมแซมเสร็จเรียบร้อย', '2024-11-08 12:55:20'),
(35, 25, 'จะดำเนินการแก้ไข', '2024-11-08 15:05:06'),
(36, 26, 'จะดำเนินการให้', '2024-11-08 15:16:59'),
(37, 26, 'กำลังดำเนินการ', '2024-11-08 15:17:24'),
(38, 26, 'ดำเนินการเสร็จสิ้น', '2024-11-08 15:19:42'),
(39, 28, 'จะดำเนินการให้', '2024-11-08 18:36:13'),
(40, 28, 'กำลังดำเนินการ', '2024-11-08 18:36:25');

-- --------------------------------------------------------

--
-- Table structure for table `issue_status`
--

CREATE TABLE `issue_status` (
  `status_id` int NOT NULL,
  `status_name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `issue_status`
--

INSERT INTO `issue_status` (`status_id`, `status_name`) VALUES
(1, 'New'),
(2, 'Assigned'),
(3, 'In Progress'),
(4, 'Pending'),
(5, 'Resolved'),
(6, 'Closed'),
(7, 'Reopened'),
(8, 'Escalated');

-- --------------------------------------------------------

--
-- Table structure for table `knowledge`
--

CREATE TABLE `knowledge` (
  `id` int NOT NULL,
  `entry_type` enum('faq','solution') NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `user_id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `knowledge`
--

INSERT INTO `knowledge` (`id`, `entry_type`, `title`, `description`, `created_at`, `user_id`) VALUES
(1, 'faq', 'วิธีแก้จอคอมดับเบื้องต้น', '1. ตรวจสอบที่สายไฟ\r\nนี่คือการจัดการที่เป็นขั้นตอนแรกที่ควรทำมาก ๆ ครับ นั่นคือการตรวจเช็คหรือตรวจสอบที่ตรงสายไฟ ในตอนที่เราเปิดคอมพิวเตอร์แล้วหน้าจอไม่ติด ให้เราสันนิษฐานไว้ก่อนเลยว่า อาจจะเป็นที่สายไฟ ให้ทำการตรวจสอบว่าสายไฟนั้นมีการหลุดหรือไม่ มีอาการหลวดหรือไม่ หรือว่าจะขาดตรงไหนหรือเปล่า เมื่อดูแล้วให้ลองขยับสายไฟ ถอดและเสียบปลั๊กใหม่ แล้วดูหน้าจอว่ามีภาพขึ้นไหมครับ\r\n2. ตรวจสอบสายเชื่อมต่อสัญญาณ\r\nลำดับต่อมาหากทำข้อ 1 แล้วหน้าจอยังคงไม่ติดอยู่ สายต่อมาที่เราจะต้องทำการตรวจสอบใหม่ก็คือเหล่าสายเชื่อมต่อสัญญาณอย่างสาย D-Sub, DVI หรือ HDMI โดยให้ถอดสายสัญญาณออกมาเช็คหรือตรวจสอบดูเลยว่ามีจุดตรงไหนขาดหรือหักไหม หากไม่มีก็ให้ลองใส่เชื่อมต่ออีกครั้งและขยับสายให้แน่นขึ้น เพื่อกันปัญหาในกรณีของสายหลวม\r\n\r\n3. เปลี่ยนสายไฟเส้นใหม่\r\nวิธีต่อมานี้เป็นวิธีที่อยากให้ลองหลังจากทำการตรวจสอบสายไฟแล้วหน้าจอยังไม่ติด นั่นก็คือการนำสายไฟใหม่มาเปลี่ยนดูเลยครับ เพื่อวัดกันไปเลยว่าเป็นที่สายไฟจริงหรือไม่ อาจจะทำการเสียบปลั๊กที่ช่องเดิม หรือจะเสียบช่องใหม่ไปเลยก็ได้ แล้วจึงลองตรวจสอบดูว่า หน้าจอคอมพิวเตอร์ของเรานั้น กลับมาติดเป็นปกติแล้วหรือยังนะครับ', '2024-10-28 13:31:27', NULL),
(2, 'solution', 'ปัญหาอุปกรณ์ต่างๆ ของเครื่องคอมพิวเตอร์หยุดการทำงาน', 'หากปัญหานี้เกิดขึ้น เราจำเป็นที่จะต้องค้นหาสาเหตุเป็นการเฉพาะ ไม่ว่าจะเป็นการที่ Keyboard / Mouse / ลำโพง / เสียงหายหรือหน้าจอแสดงผลได้ไม่สมบูรณ์ ซึ่งหากเราลองตรวจสอบ Battery หรือร่องรอยความชำรุดเสียหายแล้วไม่พบ ก็มีความเป็นไปได้ว่าสาเหตุอาจมาจาก Driver ของอุปกรณ์ดังกล่าวทำงานได้ไม่สมบูรณ์ ซึ่งแก้ไขโดยการตรวจสอบรุ่นของอุปกรณ์ที่ใช้ หลังจากนั้นให้ Download Driver จาก Internet มา Update แทน Driver เก่าก็จะช่วยให้อุปกรณ์เหล่านั้นกลับมาทำงานได้ตามปกติดังเดิม ', '2024-10-28 13:32:52', NULL),
(3, 'solution', 'คอมพิวเตอร์มีเสียงร้องติ๊ดๆ (Beep code)', 'คอมพิวเตอร์มีเสียงร้องอาจเกิดได้จากหลายเหตุปัจจัย แต่โดยปกติแล้วความผิดปกติที่เกิดขึ้นจะมีสาเหตุจากเมนบอร์ดเป็นหลัก ซึ่งส่งผลให้เกิดเสียงดังติ๊ดๆ โดยที่เสียงแต่ละแบบจะมีความหมายที่สามารถใช้บ่งบอกสาเหตุของความผิดปกติได้แตกต่างกัน ดังต่อไปนี้\r\n\r\nเสียง Beep สั้นๆ 2-3 ครั้ง : เครื่องมีปัญหา อาจเกิดจาก Ram หรือ Mainboard ทำงานผิดปกติ\r\nเสียง Beep สั้นๆ ติดต่อกันหลายครั้ง : Mainboard ทำงานผิดปกติ\r\nเสียง Beep ยาวๆ 1 ครั้ง และสั้นๆ 2 ครั้ง : เกิดปัญหาที่ Graphic Card (การ์ดจอ) ซึ่งอาจเสียบไม่สนิท/ชำรุด\r\nเสียง Beep ดังยาวๆ ต่อเนื่องหลายครั้ง : Ram หรือหน่วยความจำมีปัญหา (หรือการจัดเรียง Ram ไม่ถูกต้อง)\r\nสำหรับการแก้ไขปัญหาคอมพิวเตอร์มีเสียงร้องอาจต้องเริ่มจากการวิเคราะห์เสียงที่เกิดขึ้นก่อนโดยอ้างอิงจากข้อมูลข้างต้น หลังจากนั้นลองทำการแก้ไขด้วยวิธีพื้นฐานอย่างการ Restart เครื่องใหม่ หรือในกรณีที่ฟังเสียง Beep code แล้ววิเคราะห์ได้ว่าปัญหาที่เกิดขึ้นมาจาก Ram เป็นหลัก อาจจะลองเช็ค Ram ดูว่ามีการเสียบสนิทหรือไม่ โดยขยับหรือถอดออกมาทำความสะอาด เช่นเดียวกับปัญหาที่เกิดเพราะ Graphic Card หรือ Mainboard', '2024-10-28 13:37:36', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `permissions`
--

CREATE TABLE `permissions` (
  `permission_id` int NOT NULL,
  `permission_name` varchar(50) NOT NULL,
  `description` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `permissions`
--

INSERT INTO `permissions` (`permission_id`, `permission_name`, `description`) VALUES
(1, 'Create', 'สร้างคำขอหรือข้อมูลใหม่'),
(2, 'Read', 'ดูข้อมูลและสถานะต่าง ๆ'),
(3, 'Update', 'แก้ไขหรืออัปเดตข้อมูล'),
(4, 'Delete', 'ลบข้อมูล');

-- --------------------------------------------------------

--
-- Table structure for table `reports`
--

CREATE TABLE `reports` (
  `report_id` int NOT NULL,
  `user_id` int NOT NULL,
  `report_title` varchar(255) NOT NULL,
  `report_content` text NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `report_type` enum('daily','weekly','monthly') NOT NULL,
  `issue_id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `reports`
--

INSERT INTO `reports` (`report_id`, `user_id`, `report_title`, `report_content`, `created_at`, `report_type`, `issue_id`) VALUES
(1, 1, 'คอมเสีย', 'ตอมเปิดไม่ติด 1 เครื่อง ต้องการให้แก้ไขให้เรียบร้อย', '2024-10-30 00:45:01', 'daily', NULL),
(2, 5, 'เน็ตล่ม', 'บลาๆๆ', '2024-10-31 00:36:05', 'daily', NULL),
(3, 5, 'คอมพัง', 'ห้อง511', '2024-10-31 00:40:57', 'weekly', NULL),
(4, 5, 'สายแลนขาด', 'ห้อง201', '2024-10-31 00:43:41', 'monthly', NULL),
(5, 5, 'จอพัง', 'จอพัง 5 จอเปิดไม่ติด', '2024-11-02 20:44:10', 'monthly', NULL),
(6, 5, 'เก้าอี้หัก', 'ห้อง50', '2024-11-08 19:57:55', 'daily', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `role_id` int NOT NULL,
  `role_name` varchar(50) NOT NULL,
  `description` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`role_id`, `role_name`, `description`) VALUES
(1, 'User', 'สิทธิ์สำหรับผู้ใช้งานหรือผู้แจ้งปัญหา'),
(2, 'Queue Manager', 'สิทธิ์ในการจัดการลำดับความสำคัญของคำขอ'),
(3, 'Helpdesk Officer', 'สิทธิ์ในการติดต่อผู้ใช้งานและอัปเดตสถานะคำขอ'),
(4, 'Executive', 'สิทธิ์ในการดูรายงานและข้อมูลสถิติการใช้งาน'),
(5, 'Admin', 'สิทธิ์ในการจัดการระบบทั้งหมด');

-- --------------------------------------------------------

--
-- Table structure for table `role_permissions`
--

CREATE TABLE `role_permissions` (
  `role_id` int NOT NULL,
  `permission_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `role_permissions`
--

INSERT INTO `role_permissions` (`role_id`, `permission_id`) VALUES
(1, 1),
(3, 1),
(5, 1),
(1, 2),
(2, 2),
(3, 2),
(4, 2),
(5, 2),
(1, 3),
(2, 3),
(3, 3),
(4, 3),
(5, 3),
(5, 4);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(100) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `role_id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `username`, `password`, `email`, `created_at`, `role_id`) VALUES
(1, 'user1', 'hashed_password1', 'user1@gmail.com', '2024-10-14 13:07:52', 1),
(2, 'queue_officer', 'hashed_password2', 'queue@gmail.com', '2024-10-14 13:07:52', 2),
(3, 'helpdesk_staff', 'hashed_password3', 'helpdesk@gmail.com', '2024-10-14 13:07:52', 3),
(4, 'manager', 'hashed_password4', 'manager@gmail.com', '2024-10-14 13:07:52', 4),
(5, 'admin', 'hashed_password5', 'admin@gmail.com', '2024-10-14 13:07:52', 5),
(8, 'helpdesk2', 'hashed_password7', 'helpdesk2@gmail.com', '2024-11-08 16:56:23', 3),
(9, 'helpdesk3', 'hashed_password8', 'helpdesk3@gmail.com', '2024-11-08 16:56:49', 3);

-- --------------------------------------------------------

--
-- Table structure for table `user_roles`
--

CREATE TABLE `user_roles` (
  `user_id` int NOT NULL,
  `role_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `user_roles`
--

INSERT INTO `user_roles` (`user_id`, `role_id`) VALUES
(1, 1),
(2, 2),
(3, 3),
(8, 3),
(9, 3),
(4, 4),
(5, 5);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `issues`
--
ALTER TABLE `issues`
  ADD PRIMARY KEY (`issue_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `status_id` (`status_id`);

--
-- Indexes for table `issue_messages`
--
ALTER TABLE `issue_messages`
  ADD PRIMARY KEY (`message_id`),
  ADD KEY `issue_id` (`issue_id`);

--
-- Indexes for table `issue_status`
--
ALTER TABLE `issue_status`
  ADD PRIMARY KEY (`status_id`);

--
-- Indexes for table `knowledge`
--
ALTER TABLE `knowledge`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `permissions`
--
ALTER TABLE `permissions`
  ADD PRIMARY KEY (`permission_id`),
  ADD UNIQUE KEY `permission_name` (`permission_name`);

--
-- Indexes for table `reports`
--
ALTER TABLE `reports`
  ADD PRIMARY KEY (`report_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `fk_issue_id` (`issue_id`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`role_id`),
  ADD UNIQUE KEY `role_name` (`role_name`);

--
-- Indexes for table `role_permissions`
--
ALTER TABLE `role_permissions`
  ADD PRIMARY KEY (`role_id`,`permission_id`),
  ADD KEY `permission_id` (`permission_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `fk_role_id` (`role_id`);

--
-- Indexes for table `user_roles`
--
ALTER TABLE `user_roles`
  ADD PRIMARY KEY (`user_id`,`role_id`),
  ADD KEY `role_id` (`role_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `issues`
--
ALTER TABLE `issues`
  MODIFY `issue_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT for table `issue_messages`
--
ALTER TABLE `issue_messages`
  MODIFY `message_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT for table `issue_status`
--
ALTER TABLE `issue_status`
  MODIFY `status_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `knowledge`
--
ALTER TABLE `knowledge`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `permissions`
--
ALTER TABLE `permissions`
  MODIFY `permission_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `reports`
--
ALTER TABLE `reports`
  MODIFY `report_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `role_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `issues`
--
ALTER TABLE `issues`
  ADD CONSTRAINT `issues_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `issues_ibfk_2` FOREIGN KEY (`status_id`) REFERENCES `issue_status` (`status_id`),
  ADD CONSTRAINT `issues_ibfk_3` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `issue_messages`
--
ALTER TABLE `issue_messages`
  ADD CONSTRAINT `issue_messages_ibfk_1` FOREIGN KEY (`issue_id`) REFERENCES `issues` (`issue_id`);

--
-- Constraints for table `knowledge`
--
ALTER TABLE `knowledge`
  ADD CONSTRAINT `knowledge_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `reports`
--
ALTER TABLE `reports`
  ADD CONSTRAINT `fk_issue_id` FOREIGN KEY (`issue_id`) REFERENCES `issues` (`issue_id`),
  ADD CONSTRAINT `reports_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `role_permissions`
--
ALTER TABLE `role_permissions`
  ADD CONSTRAINT `role_permissions_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `roles` (`role_id`),
  ADD CONSTRAINT `role_permissions_ibfk_2` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`permission_id`);

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `fk_role_id` FOREIGN KEY (`role_id`) REFERENCES `roles` (`role_id`);

--
-- Constraints for table `user_roles`
--
ALTER TABLE `user_roles`
  ADD CONSTRAINT `user_roles_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `user_roles_ibfk_2` FOREIGN KEY (`role_id`) REFERENCES `roles` (`role_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
