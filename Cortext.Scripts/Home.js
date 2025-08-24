const header_analyse_button = document.querySelector('.header-analyse-button');
const header_report_button = document.querySelector('.header-report-button');
const header_github_button = document.querySelector('.header-github-button');
const header_demo_button = document.querySelector('.header-demo-button');

header_analyse_button.onclick = function() {
    section[1].scrollIntoView({behavior: 'smooth'});
}

header_report_button.onclick = function() {
    window.open('https://drive.google.com/file/d/1o-5qvhyJ6gncHhAv21tpE5ZQvvsEhFi7/view?usp=drive_link', '_blank');
}

header_github_button.onclick = function() {
    window.open('https://github.com/DarttGoblin/Cortext_server', '_blank');
}

header_demo_button.onclick = function() {
    alert('Demo will be available soon...');
    // window.open('', '_blank');
}