const say = function (name) {
    var div = document.createElement('div');
    div.innerHTML = '<h1>Hello, ' + name + '!</h1>';
    document.body.appendChild(div);
}

export default say;
