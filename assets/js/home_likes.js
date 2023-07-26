
   
function likeslister(like){  
    like.addEventListener('click',function(event){
        console.log("hi da epdi eruka")
        event.preventDefault();
        $.ajax({
            type : 'get',
            url : $(like).prop('href'),
            success : function(data){
                like.classList.toggle('liked');
                console.log("hi da epdi eruka.. successla erunthu")
                $(" .likes",like)[0].innerText =  data.data.length; 
                let count =  $(" .likes",like);
                console.log(count);
                console.log(data.data.length);
                            
            },
            error : function(err){
                console.log("hi da epdi eruka.. errorla erunthu")
                console.log(err.responseText);
            }
        })
    });
}
{
    const listeningallLikes = function(){

        let likes  = document.querySelectorAll('.likes-button');
        console.log(likes);
        
        for(let i=0;i<likes.length;i++){
            console.log(likes[i]);
            likeslister(likes[i]);
        }
    }
    listeningallLikes()

}