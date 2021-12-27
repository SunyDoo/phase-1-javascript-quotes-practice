document.addEventListener('DOMContentLoaded', ()=>{
    getAllQuotes()
    const newQuoteForm = document.getElementById('new-quote-form')
    function getAllQuotes(){
        fetch ('http://localhost:3000/quotes')
        .then (res=>res.json())
        .then (data=>data.forEach(quote=>renderOneQuote(quote)))
    }
    function renderOneQuote(quoteObj){
        const quoteList = document.getElementById('quote-list')
        const quote = document.createElement('li')
        quoteList.appendChild(quote)
        quote.classname = 'quote-card'
        quote.id = `${quoteObj.id}`
        quote.innerHTML = `
            <blockquote class="blockquote">
            <p class="mb-0">${quoteObj.quote}</p>
            <footer class="blockquote-footer">${quoteObj.author}</footer>
            <br>            
            <button class='btn-success'>Likes: <span>${quoteObj.likes}</span>     
            </button>
            <button class='btn-danger'>Delete</button>
            </blockquote>
        `
        console.log(quoteObj.likes)
        quote.addEventListener('click', handleClick)
        function handleClick(e){
            if (e.target.innerText == 'Delete'){
                deleteQuote(e.target.parentElement.parentElement.id)
                e.target.parentElement.remove()                                                                              
            }
            else if (e.target.class = 'btn-success'){
                quoteObj.likes = parseInt(e.target.parentElement.querySelector('span').innerText)
                quoteObj.likes ++ 
                e.target.parentElement.querySelector('span').innerText = quoteObj.likes
                updatesLikes(quoteObj)                
            }
        }
    }
    function updateQuoteList(quoteObj){
        fetch ('http://localhost:3000/quotes?_embed=likes',{
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body:JSON.stringify(quoteObj)
        })
        .then(res=>res.json())
        .then(quote=>console.log(quote))
    }
    function deleteQuote(id){
        fetch(`http://localhost:3000/quotes/${id}`, {
            method: 'DELETE',
            headers:{
                'Content-Type':'application/json'
            }
        })
        .then(res=>res.json())
        .then(data=>console.log(data))
    }
    function updatesLikes(quoteObj){
        fetch(`http://localhost:3000/quotes/${quoteObj.id}`,{
            method: 'PATCH',
            headers:{
            "Content-Type": "application/json",
            Accept: "application/json"
            },
            body: JSON.stringify(
                {
                    "id": `${quoteObj.id}`,
                    "quote": `${quoteObj.quote}`,
                    "author": `${quoteObj.author}`,
                    "likes": `${quoteObj.likes}`
                })                        
            })
        .then(res=>res.json())
        .then (data=>console.log(data))
    }
  
    newQuoteForm.addEventListener('submit', addQuote)
    function addQuote(e){
        e.preventDefault()
        let newObj = {
            quote: e.target.quote.value,
            author: e.target.author.value,
            likes: 0
        }
        newQuoteForm.reset()
        renderOneQuote(newObj)
        updateQuoteList(newObj)
    }
})



// function patchQuote(){
//     debugger
//     fetch ('http://localhost:3000/quotes?_embed=likes',{
//         method: 'PATCH',
//         headers:{
//             "Content-Type": "application/json",
//             Accept: "application/json"
//         },
//         body: JSON.stringify(quotes)
//     })
//     .then(res=>res.json())
//     .then (data=>renderOneDog(data))

// }


// <blockquote class="blockquote">
// <p class="mb-0">${quoteObj.quote}</p>
// <footer class="blockquote-footer">${quoteObj.author}</footer>
// <br>

// <button class='btn-success'>Likes: 
// <span>
// ${Object.values(quoteObj=>{
//     if (quoteObj.likes){
//         return `Likes: <span>${quoteObj.likes}</span>`
//     }
//     else return `Likes: <span>0</span>`
// })}
// </span></button>
// <button class='btn-danger'>Delete</button>
// </blockquote>


// {/* <button class='btn-success'>
// ${Object.keys(quoteObj=>{
//     debugger
//     if (quoteObj.likes){
//         fav = true                    
//     }                 
// })}
// ${fav ? `Likes: <span>${quoteObj.likes}</span>`:'Likes: <span>0</span>'}  */}