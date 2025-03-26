-- phpMyAdmin SQL Dump
-- version 4.9.11
-- https://www.phpmyadmin.net/
--
-- Hôte : db5017519833.hosting-data.io
-- Généré le : mer. 26 mars 2025 à 02:15
-- Version du serveur : 10.11.7-MariaDB-log
-- Version de PHP : 7.4.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `dbs14043491`
--
CREATE DATABASE IF NOT EXISTS `dbs14043491` DEFAULT CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci;
USE `dbs14043491`;

-- --------------------------------------------------------

--
-- Structure de la table `reservations`
--

CREATE TABLE `reservations` (
  `resa_id` int(11) NOT NULL,
  `dateheure` datetime NOT NULL,
  `email` varchar(255) NOT NULL,
  `prenom` varchar(255) NOT NULL,
  `nom` varchar(255) NOT NULL,
  `tarif_fk` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `reservations`
--

INSERT INTO `reservations` (`resa_id`, `dateheure`, `email`, `prenom`, `nom`, `tarif_fk`) VALUES
(26, '2025-03-27 18:00:00', 'gaelgrandval@gmail.com', 'albert', 'camus', 2),
(47, '2025-03-28 12:00:00', 'notnintendo.ds@gmail.com', 'Noor', 'Da Silva', 2),
(61, '2025-03-26 11:00:00', 'julien@gmail.com', 'julien', 'julien', 1);

-- --------------------------------------------------------

--
-- Structure de la table `tarifs`
--

CREATE TABLE `tarifs` (
  `tarif_id` int(11) NOT NULL,
  `tarif` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `tarifs`
--

INSERT INTO `tarifs` (`tarif_id`, `tarif`) VALUES
(1, 'Tarif enfant (-12 ans)'),
(2, 'Tarif jeunes (-26 ans)'),
(3, 'Plein tarif'),
(4, 'Tarif seniors (+62 ans)');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `reservations`
--
ALTER TABLE `reservations`
  ADD PRIMARY KEY (`resa_id`),
  ADD KEY `tarif_fk` (`tarif_fk`);

--
-- Index pour la table `tarifs`
--
ALTER TABLE `tarifs`
  ADD PRIMARY KEY (`tarif_id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `reservations`
--
ALTER TABLE `reservations`
  MODIFY `resa_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=63;

--
-- AUTO_INCREMENT pour la table `tarifs`
--
ALTER TABLE `tarifs`
  MODIFY `tarif_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `reservations`
--
ALTER TABLE `reservations`
  ADD CONSTRAINT `reservations_ibfk_1` FOREIGN KEY (`tarif_fk`) REFERENCES `tarifs` (`tarif_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
