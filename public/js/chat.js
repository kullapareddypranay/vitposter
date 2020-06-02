const socket=io()
const $messageform=document.querySelector('#message-form')
const $messageforminput=$messageform.querySelector('input')
const $messageformbutton=$messageform.querySelector('button')
const $sendlocationbutton=document.querySelector('#send-location')

socket.on('message',(message)=>{
    console.log(message)
    
})

$messageform.addEventListener('submit',(e)=>{
    e.preventDefault()

    $messageformbutton.setAttribute('disabled','disabled')


    const message=e.target.elements.message.value


    socket.emit('sendmessage',message,(error)=>{
        $messageformbutton.removeAttribute('disabled')
        $messageforminput.value=''
        $messageforminput.focus()
        if(error){
            return console.log(errror)
        }
        console.log('message deliverd')
    })


})


