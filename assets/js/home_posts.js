{
    //creating the post with ajax
    let createpost = function(){
        let newpost = $('#new-post-form');
        newpost.submit(function(e){
            e.preventDefault();
            $.ajax({
                type : 'post',
                url : '/post/create-post',
                data : newpost.serialize(),
                success : function(data){
                    console.log(data);
                   let newpostdom = newpostDom(data.data);
                   console.log(data.data);
                   $('#posts-container > ul').prepend(newpostdom);
                   deletepostDom($(' .delete-post-button',newpostdom));

                   //calling the comment class for the newly creating post..
                   new Comments(data.data._id);                    

                   new Noty({
                    theme : 'relax',
                    text: 'Post published',
                    type : 'success',
                    layout : 'topRight',
                    timeout :'1500'
                }).show()
                },
                error : function(err){
                    console.log(err.responseText)
                }
            })
        })
    }

    //creating the post on the DOM.
    let newpostDom = function(post){
        return $(
                `<li id="post-${ post._id }">
                    
                        <small>
                          <a  class="delete-post-button" href="/post/delete/${ post._id }">X</a>
                        </small>
                    
                        ${post.content} 
                        <br/>
                        <small>${ post.user.name }</small>
                    <div class="post-comments">
                        
                            <form action="/comment/create-comment" id="${ post._id }-new-comment-form" method="post">
                                <input type="text" name="content" placeholder="type comments here.." required/>
                                <input type="hidden" name="post" value="${ post._id }"/>
                                <input type="submit" value="Add Comment"/>
                            </form>   
                        
                        <div id="post-comments-list">
                            <ul id="post-comments-${ post._id }">
                                
                            </ul>
                        </div>    
                    </div>
                </li>
                `)
    }

    //deleting the post on the DOM.
    let deletepostDom = function(deletelink){
        $(deletelink).click( (e)=>{
            e.preventDefault();

            $.ajax({
                type : 'get',
                url : $(deletelink).prop('href'),
                success : function(data){
                    $(`#post-${data.data.post_id}`).remove();
                    new Noty({
                        theme : 'relax',
                        text: 'Post deleted',
                        type : 'success',
                        layout : 'topRight',
                        timeout :'1500'
                    }).show()
                },
                error : function(err){
                    new Noty({
                        theme : 'relax',
                        text: 'you cannot delete the post',
                        type : 'error',
                        layout : 'topRight',
                        timeout :'1500'
                    }).show()
                    console.log(err.responseText);
                },
              
            })
        })
       
    }
   
    let convertingToAjax = function(){
        
        $('#posts-container > ul > li').each(function(){
            let self = $(this);
            deletepostDom($(' .delete-post-button',self));
            let postId = self.prop('id').split('-')[1];
            new Comments(postId);
        });
       
    }

   function  myfunction(x){
        x.classList.toggle('liked');
        if(x){
            console.log('ihh')
            $(`${this > span }`).innerText = 1;
        }
    }

    createpost();
    convertingToAjax();
   

}