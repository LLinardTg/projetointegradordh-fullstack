CREATE DATABASE  IF NOT EXISTS `devhouse` /*!40100 DEFAULT CHARACTER SET utf8 */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `devhouse`;
-- MySQL dump 10.13  Distrib 8.0.22, for macos10.15 (x86_64)
--
-- Host: 127.0.0.1    Database: devhouse
-- ------------------------------------------------------
-- Server version	8.0.22

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `admins`
--

DROP TABLE IF EXISTS `admins`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admins` (
  `idadmin` int NOT NULL AUTO_INCREMENT,
  `Nome` varchar(50) NOT NULL,
  `email` varchar(45) NOT NULL,
  `senha` varchar(256) NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updateAt` datetime DEFAULT NULL,
  PRIMARY KEY (`idadmin`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admins`
--

LOCK TABLES `admins` WRITE;
/*!40000 ALTER TABLE `admins` DISABLE KEYS */;
/*!40000 ALTER TABLE `admins` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categorias`
--

DROP TABLE IF EXISTS `categorias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categorias` (
  `idcategorias` int NOT NULL AUTO_INCREMENT,
  `categoria` varchar(45) NOT NULL,
  `subcategoria` varchar(45) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`idcategorias`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categorias`
--

LOCK TABLES `categorias` WRITE;
/*!40000 ALTER TABLE `categorias` DISABLE KEYS */;
INSERT INTO `categorias` VALUES (3,'Adesivo','Divertido','2020-11-01 22:35:56','2020-11-01 22:35:56'),(5,'Caneca','Linguagens','2020-11-01 22:58:52','2020-11-01 22:58:52'),(6,'Camiseta','Divertido','2020-11-01 23:01:21','2020-11-01 23:01:21'),(7,'Caneca','Códigos','2020-11-02 02:08:31','2020-11-02 02:08:31'),(8,'Caneca','Dicionário','2020-11-02 02:21:12','2020-11-02 02:21:12'),(9,'Caneca','Divertido','2020-11-02 02:24:49','2020-11-02 02:24:49'),(10,'Caneca','Simples','2020-11-02 02:27:51','2020-11-02 02:27:51'),(11,'Camiseta','Linguagens','2020-11-06 23:25:23','2020-11-06 23:25:23'),(12,'Camiseta','Códigos','2020-11-06 23:26:26','2020-11-06 23:26:26'),(13,'Adesivo','Softwares','2020-11-06 23:36:40','2020-11-06 23:36:40'),(14,'Adesivo','Linguagens','2020-11-06 23:38:20','2020-11-06 23:38:20');
/*!40000 ALTER TABLE `categorias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `clientes`
--

DROP TABLE IF EXISTS `clientes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clientes` (
  `idclientes` int NOT NULL AUTO_INCREMENT,
  `Nome` varchar(50) NOT NULL,
  `Telefone` varchar(100) NOT NULL,
  `Endereco` varchar(100) NOT NULL,
  `email` varchar(45) NOT NULL,
  `senha` varchar(45) NOT NULL,
  `cpf` varchar(45) NOT NULL,
  `data_nascimento` date NOT NULL,
  `sexo` varchar(45) NOT NULL,
  `CEP` int NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updateAt` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idclientes`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clientes`
--

LOCK TABLES `clientes` WRITE;
/*!40000 ALTER TABLE `clientes` DISABLE KEYS */;
/*!40000 ALTER TABLE `clientes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `favoritos`
--

DROP TABLE IF EXISTS `favoritos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `favoritos` (
  `idclientes` int NOT NULL,
  `idprodutos` int NOT NULL,
  `idfavoritos` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`idfavoritos`),
  KEY `fk_Clientes_has_produtos_produtos1_idx` (`idprodutos`),
  KEY `fk_Clientes_has_produtos_Clientes1_idx` (`idclientes`),
  CONSTRAINT `fk_Clientes_has_produtos_Clientes1` FOREIGN KEY (`idclientes`) REFERENCES `clientes` (`idclientes`),
  CONSTRAINT `fk_Clientes_has_produtos_produtos1` FOREIGN KEY (`idprodutos`) REFERENCES `produtos` (`idprodutos`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `favoritos`
--

LOCK TABLES `favoritos` WRITE;
/*!40000 ALTER TABLE `favoritos` DISABLE KEYS */;
/*!40000 ALTER TABLE `favoritos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `logs`
--

DROP TABLE IF EXISTS `logs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `logs` (
  `idlogs` int NOT NULL,
  `acao_admin` varchar(200) NOT NULL,
  `idadmin` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updateAt` datetime DEFAULT NULL,
  PRIMARY KEY (`idlogs`),
  KEY `fk_logs_admins1_idx` (`idadmin`),
  CONSTRAINT `fk_logs_admins1` FOREIGN KEY (`idadmin`) REFERENCES `admins` (`idadmin`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `logs`
--

LOCK TABLES `logs` WRITE;
/*!40000 ALTER TABLE `logs` DISABLE KEYS */;
/*!40000 ALTER TABLE `logs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pedidos`
--

DROP TABLE IF EXISTS `pedidos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pedidos` (
  `idpedidos` int NOT NULL AUTO_INCREMENT,
  `idclientes` int NOT NULL,
  `total` decimal(10,0) NOT NULL,
  `data` date NOT NULL,
  `frete` decimal(10,0) NOT NULL,
  `status` varchar(100) NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updateAt` datetime DEFAULT NULL,
  PRIMARY KEY (`idpedidos`),
  KEY `fk_pedidos_Clientes1_idx` (`idclientes`),
  CONSTRAINT `fk_pedidos_Clientes1` FOREIGN KEY (`idclientes`) REFERENCES `clientes` (`idclientes`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pedidos`
--

LOCK TABLES `pedidos` WRITE;
/*!40000 ALTER TABLE `pedidos` DISABLE KEYS */;
/*!40000 ALTER TABLE `pedidos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pedidos_has_produtos`
--

DROP TABLE IF EXISTS `pedidos_has_produtos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pedidos_has_produtos` (
  `idpedidos` int NOT NULL,
  `idprodutos` int NOT NULL,
  `idpedidos_produtos` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`idpedidos_produtos`),
  KEY `fk_pedidos_has_produtos_produtos1_idx` (`idprodutos`),
  KEY `fk_pedidos_has_produtos_pedidos_idx` (`idpedidos`),
  CONSTRAINT `fk_pedidos_has_produtos_pedidos` FOREIGN KEY (`idpedidos`) REFERENCES `pedidos` (`idpedidos`),
  CONSTRAINT `fk_pedidos_has_produtos_produtos1` FOREIGN KEY (`idprodutos`) REFERENCES `produtos` (`idprodutos`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pedidos_has_produtos`
--

LOCK TABLES `pedidos_has_produtos` WRITE;
/*!40000 ALTER TABLE `pedidos_has_produtos` DISABLE KEYS */;
/*!40000 ALTER TABLE `pedidos_has_produtos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `produtos`
--

DROP TABLE IF EXISTS `produtos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `produtos` (
  `idprodutos` int NOT NULL AUTO_INCREMENT,
  `codigo` varchar(45) NOT NULL,
  `nome` varchar(45) NOT NULL,
  `preco` decimal(10,0) NOT NULL,
  `imagem` varchar(150) NOT NULL,
  `quantidade` bigint NOT NULL,
  `tamanho` varchar(45) DEFAULT NULL,
  `cor` varchar(45) DEFAULT NULL,
  `hexcor` varchar(45) DEFAULT NULL,
  `desconto` decimal(10,0) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `id_produtos_categorias` int NOT NULL,
  PRIMARY KEY (`idprodutos`),
  KEY `fk_produtos_categorias1_idx` (`id_produtos_categorias`),
  CONSTRAINT `fk_produtos_categorias1` FOREIGN KEY (`id_produtos_categorias`) REFERENCES `categorias` (`idcategorias`)
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `produtos`
--

LOCK TABLES `produtos` WRITE;
/*!40000 ALTER TABLE `produtos` DISABLE KEYS */;
INSERT INTO `produtos` VALUES (5,'0001','Adesivo Fluxo',5,'/images/produtos/adesivoo1.png',50,NULL,'Branco','#ffffff',NULL,'2020-11-01 22:55:03','2020-11-01 22:55:03',3),(6,'0002','Adesivo StarDevOps',5,'/images/produtos/adesivoo2.png',60,NULL,'Preto','#000000',NULL,'2020-11-01 22:57:12','2020-11-01 22:57:12',3),(7,'0003','Caneca Java',30,'/images/produtos/caneca4.jpg',40,NULL,'Branco','#ffffff',NULL,'2020-11-01 22:58:52','2020-11-01 22:58:52',5),(8,'0004','Camiseta Diva',30,'/images/produtos/camiseta.jpg',30,'PP','Branco','#ffffff',NULL,'2020-11-01 23:01:21','2020-11-01 23:01:21',6),(15,'0004','Camiseta Diva',30,'/images/produtos/camiseta.jpg',30,'P','Branco','#ffffff',NULL,'2020-11-02 02:03:29','2020-11-02 02:03:29',6),(16,'0004','Camiseta Diva',30,'/images/produtos/camiseta.jpg',30,'M','Branco','#ffffff',NULL,'2020-11-02 02:03:36','2020-11-02 02:03:36',6),(17,'0004','Camiseta Diva',30,'/images/produtos/camiseta.jpg',30,'G','Branco','#ffffff',NULL,'2020-11-02 02:03:40','2020-11-02 02:03:40',6),(18,'0004','Camiseta Diva',30,'/images/produtos/camiseta.jpg',30,'GG','Branco','#ffffff',NULL,'2020-11-02 02:03:46','2020-11-02 02:03:46',6),(21,'0005','Caneca Código Café',35,'/images/produtos/caneca3.jpg',20,NULL,'Preto','#000000',NULL,'2020-11-02 02:17:41','2020-11-02 02:17:41',7),(22,'0006','Caneca Debugar/Programar',35,'/images/produtos/caneca5.jpg',30,NULL,'Cinza','#bab5b5',NULL,'2020-11-02 02:21:12','2020-11-02 02:21:12',8),(23,'0007','Caneca Nuvem',40,'/images/produtos/caneca2.jpg',30,NULL,'Branco','#ffffff',NULL,'2020-11-02 02:22:50','2020-11-02 02:22:50',8),(24,'0008','Caneca GameOver',50,'/images/produtos/caneca1.jpg',30,NULL,'Branco','#ffffff',NULL,'2020-11-02 02:24:49','2020-11-02 02:24:49',9),(25,'0009','Caneca Vermelha',25,'/images/produtos/canecaVermelha.jpg',20,NULL,'Vermelho','#e00606',NULL,'2020-11-02 02:27:51','2020-11-02 02:27:51',10),(26,'00010','Camiseta Product Software',35,'/images/produtos/produto_camiseta.jpg',30,'PP','Cinza','#bab5b5',NULL,'2020-11-06 23:23:51','2020-11-06 23:23:51',6),(27,'00010','Camiseta Product Software',35,'/images/produtos/produto_camiseta.jpg',30,'P','Cinza','#bab5b5',NULL,'2020-11-06 23:24:02','2020-11-06 23:24:02',6),(28,'00010','Camiseta Product Software',35,'/images/produtos/produto_camiseta.jpg',30,'M','Cinza','#bab5b5',NULL,'2020-11-06 23:24:12','2020-11-06 23:24:12',6),(29,'00010','Camiseta Product Software',35,'/images/produtos/produto_camiseta.jpg',30,'G','Cinza','#bab5b5',NULL,'2020-11-06 23:24:18','2020-11-06 23:24:18',6),(30,'00010','Camiseta Product Software',35,'/images/produtos/produto_camiseta.jpg',30,'GG','Cinza','#bab5b5',NULL,'2020-11-06 23:24:28','2020-11-06 23:24:28',6),(31,'00011','Camiseta html',40,'/images/produtos/htmlcamiseta.jpeg',40,'PP','Preto','#000000',NULL,'2020-11-06 23:25:23','2020-11-06 23:25:23',11),(32,'00012','Camiseta Dev',40,'/images/produtos/dev.png',30,'PP','Preto','#000000',NULL,'2020-11-06 23:26:26','2020-11-06 23:26:26',12),(33,'00011','Camiseta html',40,'/images/produtos/htmlcamiseta.jpeg',40,'P','Preto','#000000',NULL,'2020-11-06 23:26:44','2020-11-06 23:26:44',11),(34,'00011','Camiseta html',40,'/images/produtos/htmlcamiseta.jpeg',40,'M','Preto','#000000',NULL,'2020-11-06 23:26:52','2020-11-06 23:26:52',11),(35,'00011','Camiseta html',40,'/images/produtos/htmlcamiseta.jpeg',40,'G','Preto','#000000',NULL,'2020-11-06 23:26:58','2020-11-06 23:26:58',11),(36,'00011','Camiseta html',40,'/images/produtos/htmlcamiseta.jpeg',40,'GG','Preto','#000000',NULL,'2020-11-06 23:27:09','2020-11-06 23:27:09',11),(37,'00012','Camiseta Dev',40,'/images/produtos/dev.png',30,'P','Preto','#000000',NULL,'2020-11-06 23:27:29','2020-11-06 23:27:29',12),(38,'00012','Camiseta Dev',40,'/images/produtos/dev.png',30,'M','Preto','#000000',NULL,'2020-11-06 23:27:38','2020-11-06 23:27:38',12),(39,'00012','Camiseta Dev',40,'/images/produtos/dev.png',30,'G','Preto','#000000',NULL,'2020-11-06 23:27:44','2020-11-06 23:27:44',12),(40,'00012','Camiseta Dev',40,'/images/produtos/dev.png',30,'GG','Preto','#000000',NULL,'2020-11-06 23:27:51','2020-11-06 23:27:51',12),(41,'00013','Adesivo Visual Studio Code',3,'/images/produtos/visualstudio.png',50,NULL,'Azul','#0621ea',NULL,'2020-11-06 23:36:40','2020-11-06 23:36:40',13),(42,'00014','Adesivo PHP',4,'/images/produtos/php.png',50,NULL,'Preto','#000000',NULL,'2020-11-06 23:38:20','2020-11-06 23:38:20',14),(43,'00015','Adesivo JAVA',5,'/images/produtos/java.png',50,NULL,'Azul','#0621ea',NULL,'2020-11-06 23:39:26','2020-11-06 23:39:26',14),(44,'00016','Adesivo Hacker',4,'/images/produtos/hacker.png',50,NULL,'Verde','#074011',NULL,'2020-11-06 23:40:22','2020-11-06 23:40:22',3);
/*!40000 ALTER TABLE `produtos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'devhouse'
--

--
-- Dumping routines for database 'devhouse'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-11-07 23:02:59
