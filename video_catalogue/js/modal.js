var modal = document.querySelector(".modal2");
var trigger = document.querySelector(".trigger");
var closeButton = document.querySelector(".close-button");

function toggleModal() 
{
    modal.classList.toggle("show-modal");
}

function windowOnClick(event)
 {
    if (event.target === modal) 
	{
        toggleModal();
    }
	
}