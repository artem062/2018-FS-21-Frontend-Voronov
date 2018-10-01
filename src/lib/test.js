const say = function (name) {
    var div = document.createElement('div');
    div.innerHTML = '<h1>Hello, ' + name + '!</h1>';
    div.style.backgroundColor = 'yellow';
    div.align = 'center';
    div.style.height = 100;
    document.body.appendChild(div);
}

export default say;
