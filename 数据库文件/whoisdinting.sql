/*
SQLyog Ultimate v10.00 Beta1
MySQL - 5.7.37-log : Database - whoisdinting
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`whoisdinting` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_bin */;

USE `whoisdinting`;

/*Table structure for table `mainwords` */

DROP TABLE IF EXISTS `mainwords`;

CREATE TABLE `mainwords` (
  `id` int(6) NOT NULL AUTO_INCREMENT,
  `common` char(26) NOT NULL,
  `dinting` char(26) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=58 DEFAULT CHARSET=utf8mb4;

/*Data for the table `mainwords` */

insert  into `mainwords`(`id`,`common`,`dinting`) values (1,'张飞','李逵'),(2,'亲嘴','飞吻'),(3,'三角裤','泳裤'),(4,'吃屎','老八'),(5,'老六','伏地魔'),(6,'学习资料','练习册'),(7,'动作大片','成人电影'),(8,'成人电影','老汉推车'),(9,'爱情电影','狗血电影'),(10,'十万个为什么','十万个冷笑话'),(11,'托塔天王晁盖','托塔天王李靖'),(12,'美猴王','美鸡王'),(13,'打篮球','您是空白卧底'),(14,'sleep','sheep'),(15,'鸡你太美','本次您是空白卧底'),(16,'蔡徐坤','鹿晗'),(17,'谢大脚','赤脚大仙'),(18,'董永','董永的狗'),(19,'老汉推车','观音坐莲'),(20,'没信号','触电'),(21,'听妈妈的话','天上的星星不说话'),(22,'我好寂寞','太无敌而找不到对'),(23,'规则突变：您是空白好人，找出那个有词的卧底','鬼灵精怪'),(24,'光身子上坟','坟冒青烟'),(25,'金钩子','鱼钩子'),(26,'asshole（屁眼的意思）','ass(傻瓜的意思)'),(27,'法克','艹'),(28,'行者孙','武松'),(29,'武大郎','二哥'),(30,'奥利给饼干','奥利奥饼干'),(31,'印度神油','牛尿'),(32,'啊三','啊sir'),(33,'鬼子','汉奸'),(34,'吃饭睡觉打豆豆','睡觉旅游打王者'),(35,'李白','剑圣'),(36,'范闲','李白'),(37,'鼠标','您是空白卧底'),(38,'做羞羞的事情','悄悄的办事'),(39,'放肆','狂妄'),(40,'朱元璋','成吉思汗'),(41,'蒙古人','草原上吃草'),(42,'gril','花姑娘'),(43,'曼妙的身姿','蛇皮走位'),(44,'武则天','慈禧太后'),(45,'老婆婆','慈禧太后'),(46,'从前','现在'),(47,'农夫被蛇咬了','农夫救蛇'),(48,'sweat小甜心','你暗恋的女孩'),(49,'努力前行，无所畏惧','致敬我们失去的青春'),(50,'庆余年','您是空白卧底'),(51,'马超','赵云'),(52,'曹贼','曹阿瞒'),(53,'三个国家','三国'),(54,'嗨皮的小狗','好嗨哦'),(55,'左边的人是卧底','您是卧底'),(56,'下雨了打伞回家','下雨了就不回家了'),(57,'城墙上的炉子','你爷爷的胡子');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
