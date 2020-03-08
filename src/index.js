document.addEventListener("DOMContentLoaded", function(event){

    let base_url = 'http://localhost:3000/hogs'

    let hogContainer = document.getElementById('hog-container')       

    fetch(base_url)
    .then(resp => resp.json())
    .then(hogs => {
        hogs.forEach(hog=> {

            let div = document.createElement('div')
            div.innerHTML = `
            <h3>${hog.name} </h3>
            <h4>${hog.specialty}</h4>
            <h5>${hog.greased}</h5>
            <h5>${hog["weight as a ratio of hog to LG - 24.7 Cu. Ft. French Door Refrigerator with Thru-the-Door Ice and Water"]}</h5>
            <h5>${hog["highest medal achieved"]}</h5>
            <h5>${hog.image}</h5>
            <button data-id = ${hog.id} data-purpose ="delete" >Delete </delete>
             `
             div.className = "hog-card"
             hogContainer.appendChild(div)
            })
    })

        let form = document.getElementById('hog-form')
        form.addEventListener("submit", function(event){

            event.preventDefault()
 
            let greased = document.getElementById("checkbox").checked

           let name = event.target.name.value
           let specialty = event.target.specialty.value
           let medal = event.target.medal.value
           let weight = event.target.weight.value
           let img = event.target.img.value
           
           body={name:name, specialty:specialty, "highest medal achieved":medal, "weight as a ratio of hog to LG - 24.7 Cu. Ft. French Door Refrigerator with Thru-the-Door Ice and Water":weight, image:img, greased: greased  }

            fetch(`${base_url}`, {
             method: 'POST', 
             headers: {
            'Content-Type': 'application/json',
             },
             body: JSON.stringify(body),
             })
             .then(resp => resp.json())
             .then(hog => {

                let div = document.createElement('div')
                div.innerHTML = `
                <h3>${hog.name}</h3>
                <h4>${hog.specialty}</h4>
                <h5>${hog.greased}</h5>
                <h5>${hog.weight}</h5>
                <h5>${hog.medal}</h5>
                <h5>${hog.image}</h5>
                 `
             })     
                    
        })             
                        
    hogContainer.addEventListener("click", function(event){
    
        
         if (event.target.dataset.purpose === "delete")
         {event.target.parentNode.remove()}
    
         let hogId = parseInt(event.target.dataset.id)
    
         fetch(`${base_url}/${hogId}`, {
          method: 'DELETE', 
          headers: {
             'Content-Type': 'application/json',
              }
        })
            
        
    })
                    
 })