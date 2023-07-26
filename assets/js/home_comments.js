
class Comments{

    constructor(post_id){
        let selfouter = this;
        this.postContainer = $(`#post-${post_id}`);
        this.newcommentform = $(`#${post_id}-new-comment-form`);
        selfouter.createcomment(post_id);
        $(' .comment-delete', this.postContainer).each(function(){
            selfouter.deletecomment($(this));
        });
    }

    //create a comment with ajax
    createcomment(post_id){
        let pSelf = this;
        this.newcommentform.submit(function(e){
            console.log("hi");
            let self = this;
            e.preventDefault();
            $.ajax({
                type : 'post',
                url : '/comment/create-comment',
                data : $(self).serialize(),
                success : function(data){
                    console.log(data.data.comment);
                    let newcomment = pSelf.newcommentDom(data.data.comment,data.data.post);
                    
                    console.log(data.data.post);
                    $(`#post-comments-${ post_id }`).prepend(newcomment);
                    pSelf.deletecomment($(' .comment-delete',newcomment));
                    likeslister($(' .likes-button',newcomment)[0]);
                    new Noty({
                        theme : 'relax',
                        text: 'comment Added',
                        type : 'success',
                        layout : 'topRight',
                        timeout :'1500'
                       }).show();
                },
                error : function(err){
                    console.log(err.responseText);
                }
            })
        })
    }

    //create a comment in the DOM.
    newcommentDom(comment,post){
        return $(`
            <li id="comment-${comment._id}">
                 <a class="comment-delete" href="/comment/delete/?id=${post._id}&cid=${comment._id}">X</a>
                 ${comment.content }<br/>
                 <small>${comment.user.name}</small>
                    <div >
                        <a href="like/toggle/?id=${comment._id }&type=Comment" class="fa fa-thumbs-up likes-button">Likes <span class="likes">${comment.like.length }</span></a> 
                        
                    </div>
            </li>`);
    }

    //Deleting the comment on DOM.
    deletecomment(deletelink){
        let deletebutton = $(deletelink);
        //console.log('hello from outer function');
        deletebutton.click(function(e){
            e.preventDefault();
            console.log( $(deletelink).prop('href'));
            $.ajax({
                type : 'get',
                url : $(deletelink).prop('href'),
                success : function(data){
                    $(`#comment-${data.data.comment_id}`).remove();
                    new Noty({
                        theme : 'relax',
                        text: 'comment deleted',
                        type : 'success',
                        layout : 'topRight',
                        timeout :'1500'
                       }).show();
                },
                error : function(err){
                    console.log(err.responseText);
                }
            })
        })
    }
   

}