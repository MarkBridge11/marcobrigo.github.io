const sections = document.querySelectorAll('section');

const navButtons = document.querySelectorAll('div ul li');

window.addEventListener('scroll',()=>{
    let current = '';

    sections.forEach( section =>{
        const sectionTop = section.offsetTop;
        if(window.scrollY  >= sectionTop){
            current = section.getAttribute('id');
        }
    })

    navButtons.forEach(li =>{
        li.classList.remove('active');
        if(li.getAttribute('id').includes(current)){
            li.classList.add('active');
        }
    })
})



