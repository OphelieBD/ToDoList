<?php 

	include_once('SQL.php');

	if (isset($_GET['action'])) //Si utilisation de $_GET
	{
		switch ($_GET['action']) 
		{
			case 'tâches':
				affichageTaches();
			break;
		}
	}


	if (isset($_POST['action'])) //Si utilisation de $_POST
	{
		switch ($_POST['action']) 
		{
			case 'insererDansTravail': 
				if (isset($_POST['tache'])) 
				{
					ajoutTacheDansTravail($_POST['tache']);
				}
			break;
			
			case 'insererDansPrive': 
				if (isset($_POST['tache'])) 
				{
					ajoutTacheDansPrive($_POST['tache']);
				}
			break;

			case 'supprimerTache':
				if (isset($_POST['idTache']))
				{
					suppressionTache($_POST['idTache']);
				}
			break;
		}
	}

function affichageTaches() //Renvoie la liste des tâches présentes dans la BDD
{
	$resultatTaches = SQLSelect("SELECT * FROM taches");
	echo json_encode($resultatTaches);	
}

function ajoutTacheDansTravail($tache) //Ajoute une tâche dans la catégorie "travail" de la BDD, avec en paramètre tache ($_POST['tache'])
{
	$envoiTacheCategorie1 = SQLInsertWithParams(
		"INSERT INTO taches(texte, categorie) VALUES (:tache, :categorie)", 
		array("tache"=>$tache, "categorie"=>"Travail")
	);
	echo json_encode($envoiTacheCategorie1);
}

function ajoutTacheDansPrive($tache) //Ajoute une tâche dans la catégorie "privé" de la BDD, avec en paramètre tache ($_POST['tache'])
{
	$envoiTacheCategorie2 = SQLInsertWithParams(
		"INSERT INTO taches(texte, categorie) VALUES (:tache, :categorie)",
		array("tache"=>$tache, "categorie" => "Prive")
	);
	echo json_encode($envoiTacheCategorie2);
}

function suppressionTache($id) //Supprime une tâche de la BDD
{
	$supprimeTache = SQLEdit(
		"DELETE FROM taches WHERE id = $id");
}

?>