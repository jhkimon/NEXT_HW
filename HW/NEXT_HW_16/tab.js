function clickNav() {
    var title = document.querySelector('.title h1');
    var description = document.querySelector('.title div');

    var dict = {
        About: 'Custom Software Development Company',
        Products: 'View Our Newest Products!',
        Technology: 'This is our newest Technology.',
        Downloads: 'Download our CV here.',
    };

    var buttonText = document.activeElement.getAttribute('data-button');
    title.textContent = buttonText;
    description.textContent = dict[buttonText];
}
