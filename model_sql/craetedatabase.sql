-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema devhouse
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema devhouse
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `devhouse` DEFAULT CHARACTER SET utf8 ;
USE `devhouse` ;

-- -----------------------------------------------------
-- Table `devhouse`.`clientes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `devhouse`.`clientes` (
  `idclientes` INT NOT NULL AUTO_INCREMENT,
  `Nome` VARCHAR(50) NOT NULL,
  `Telefone` VARCHAR(100) NOT NULL,
  `Endereco` VARCHAR(100) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `senha` VARCHAR(45) NOT NULL,
  `cpf` VARCHAR(45) NOT NULL,
  `data_nascimento` DATE NOT NULL,
  `sexo` VARCHAR(45) NOT NULL,
  `CEP` INT NOT NULL,
  `createdAt` DATETIME NULL,
  `updateAt` VARCHAR(45) NULL,
  PRIMARY KEY (`idclientes`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `devhouse`.`pedidos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `devhouse`.`pedidos` (
  `idpedidos` INT NOT NULL AUTO_INCREMENT,
  `idclientes` INT NOT NULL,
  `total` DECIMAL NOT NULL,
  `data` DATE NOT NULL,
  `frete` DECIMAL NOT NULL,
  `status` VARCHAR(100) NOT NULL,
  `createdAt` DATETIME NULL,
  `updateAt` DATETIME NULL DEFAULT NULL,
  PRIMARY KEY (`idpedidos`),
  INDEX `fk_pedidos_Clientes1_idx` (`idclientes` ASC) VISIBLE,
  CONSTRAINT `fk_pedidos_Clientes1`
    FOREIGN KEY (`idclientes`)
    REFERENCES `devhouse`.`clientes` (`idclientes`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `devhouse`.`categorias`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `devhouse`.`categorias` (
  `idcategorias` INT NOT NULL AUTO_INCREMENT,
  `categoria` VARCHAR(45) NOT NULL,
  `subcategoria` VARCHAR(45) NULL DEFAULT NULL,
  `createdAt` DATETIME NULL,
  `updateAt` DATETIME NULL,
  PRIMARY KEY (`idcategorias`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `devhouse`.`produtos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `devhouse`.`produtos` (
  `idprodutos` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(45) NOT NULL,
  `preco` DECIMAL NOT NULL,
  `imagem` VARCHAR(150) NOT NULL,
  `quantidade` BIGINT(150) NOT NULL,
  `tamanho` VARCHAR(45) NULL DEFAULT NULL,
  `cor` VARCHAR(45) NULL DEFAULT NULL,
  `desconto` DECIMAL NULL DEFAULT NULL,
  `createdAt` DATETIME NULL,
  `updateAt` DATETIME NULL DEFAULT NULL,
  `id_produtos_categorias` INT NOT NULL,
  PRIMARY KEY (`idprodutos`),
  INDEX `fk_produtos_categorias1_idx` (`id_produtos_categorias` ASC) VISIBLE,
  CONSTRAINT `fk_produtos_categorias1`
    FOREIGN KEY (`id_produtos_categorias`)
    REFERENCES `devhouse`.`categorias` (`idcategorias`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `devhouse`.`pedidos_has_produtos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `devhouse`.`pedidos_has_produtos` (
  `idpedidos` INT NOT NULL,
  `idprodutos` INT NOT NULL,
  `idpedidos_produtos` INT NOT NULL AUTO_INCREMENT,
  INDEX `fk_pedidos_has_produtos_produtos1_idx` (`idprodutos` ASC) VISIBLE,
  INDEX `fk_pedidos_has_produtos_pedidos_idx` (`idpedidos` ASC) VISIBLE,
  PRIMARY KEY (`idpedidos_produtos`),
  CONSTRAINT `fk_pedidos_has_produtos_pedidos`
    FOREIGN KEY (`idpedidos`)
    REFERENCES `devhouse`.`pedidos` (`idpedidos`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_pedidos_has_produtos_produtos1`
    FOREIGN KEY (`idprodutos`)
    REFERENCES `devhouse`.`produtos` (`idprodutos`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `devhouse`.`favoritos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `devhouse`.`favoritos` (
  `idclientes` INT NOT NULL,
  `idprodutos` INT NOT NULL,
  `idfavoritos` INT NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`idfavoritos`),
  INDEX `fk_Clientes_has_produtos_produtos1_idx` (`idprodutos` ASC) VISIBLE,
  INDEX `fk_Clientes_has_produtos_Clientes1_idx` (`idclientes` ASC) VISIBLE,
  CONSTRAINT `fk_Clientes_has_produtos_Clientes1`
    FOREIGN KEY (`idclientes`)
    REFERENCES `devhouse`.`clientes` (`idclientes`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Clientes_has_produtos_produtos1`
    FOREIGN KEY (`idprodutos`)
    REFERENCES `devhouse`.`produtos` (`idprodutos`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `devhouse`.`admins`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `devhouse`.`admins` (
  `idadmin` INT NOT NULL AUTO_INCREMENT,
  `Nome` VARCHAR(50) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `senha` VARCHAR(256) NOT NULL,
  `createdAt` DATETIME NULL,
  `updateAt` DATETIME NULL,
  PRIMARY KEY (`idadmin`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `devhouse`.`logs`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `devhouse`.`logs` (
  `idlogs` INT NOT NULL,
  `acao_admin` VARCHAR(200) NOT NULL,
  `idadmin` INT NOT NULL,
  `createdAt` DATETIME NOT NULL,
  `updateAt` DATETIME NULL,
  PRIMARY KEY (`idlogs`),
  INDEX `fk_logs_admins1_idx` (`idadmin` ASC) VISIBLE,
  CONSTRAINT `fk_logs_admins1`
    FOREIGN KEY (`idadmin`)
    REFERENCES `devhouse`.`admins` (`idadmin`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
