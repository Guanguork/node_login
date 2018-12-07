console.log('ok machine')

function addField(elSel) {
    const el = document.querySelector(elSel)
    el.addEventListener('click', (e)=> {
       const newField = document.createElement('input')
       newField.setAttribute('class', 'form-control mt-2')
       newField.setAttribute('name', 'anotherName')
       e.target.parentNode.appendChild(newField)
       console.log(e.target)
    })
}

