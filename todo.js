$(document).ready(function(){ //dès que la page est chargée, fait la requête ajax pour récupérer tâches déjà dans BDD
	$.ajax({
            url: 'controleur.php',
            dataType: 'text',
            data: { 
			  	action: "tâches" 
			},
			success: afficherTaches
    });   
});

$("#input1").on("change paste keyup", function() { //rend le bouton validation 1 cliquable dès qu'on écrit dans l'input associé
   $("#boutonValidation1").removeAttr('disabled');
});

$("#input2").on("change paste keyup", function() { //rend le bouton validation 1 cliquable dès qu'on écrit dans l'input associé
   $("#boutonValidation2").removeAttr('disabled');
});

$("#form1").submit(function(e){ //Dès qu'on ajoute une tâche dans "travail", on fait requête ajax pour l'enregistrer en BD
	var dato = $(this).serialize();
	$("#input1").val(''); // vide l'input
	$("#boutonValidation1").attr('disabled', 'disabled'); //remet le bouton disable
	e.preventDefault(); // Annulation de l'envoi des données via le formulaire (car on le fait via ajax)
	$.ajax({
	    type : "POST",
	    url: 'controleur.php',
	    dataType: 'json',
	    data: dato,
	    success : function() {
	        $("#confirmationEnvoi1").html("Bien enregistré"); // message de validation 
	        afficherDerniereTache(); // rajoute la dernière tache à la liste affichée
	    },
	    error: function() {
	        $("#confirmationEnvoi1").html("Erreur d'appel Ajax");
	    }
	});
});

$("#form2").submit(function(e){ //Dès qu'on ajoute une tâche dans "privé", on fait requête ajax pour l'enregistrer en BDD
	var dato = $(this).serialize();
	$("#input2").val('');
	$("#boutonValidation2").attr('disabled', 'disabled');
	e.preventDefault(); // Annulation de l'envoi des données via le formulaire (car on le fait via ajax)
	$.ajax({
	    type : "POST",
	    url: 'controleur.php',
	    dataType: 'text',
	    data: dato,
	    success : function() {
	        $("#confirmationEnvoi2").html("Bien enregistré");
	        afficherDerniereTache();
	    },
	    error: function() {
	        $("#confirmationEnvoi2").html("Erreur d'appel Ajax");
	    }
	});
});


function afficherTaches(data) //affiche la liste des tâches déjà présentes en base de données
{
	var donneesRecues = JSON.parse(data);
	$("#categorie1").empty();
	$("#categorie2").empty();
	for (var i = 0; i < donneesRecues.length; i++) 
	{
		var taches = donneesRecues[i]['texte'];
		if (donneesRecues[i]['categorie'] == 'Travail') 
		{
			$('#categorie1').append('<li>'+ taches +'</li>');
		}
		else if (donneesRecues[i]['categorie'] == 'Prive') 
		{
			$('#categorie2').append('<li>'+ taches +'</li>');
		}
	}
}

function afficherDerniereTache(){
	$.ajax({
        url: 'controleur.php',
        dataType: 'text',
        data: { 
		action: "tâches" 
		},
		success: afficherTaches
    });
}
