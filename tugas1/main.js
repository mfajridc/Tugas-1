function main() {
    var canvas = document.getElementById('myCanvas');
    var gl = canvas.getContext('webgl');

    const object_dioda = {
        line_top_color: [75/255, 0/255, 130/255],
        line_top_d: [-0.72, 0.17],
        line_top_c: [-0.74, 0.03],
        line_top_g: [-0.43, 0.18],
        line_top_h: [-0.4, 0.04],
        line_top_i: [-0.68, -0.24],
        line_top_j: [-0.47, -0.21],
        
        
    };


    const object_dioda_2 = {
        line_left_color: [75/255, 0/255, 130/255],
        line_left_k: [0.45, 0.17],
        line_left_l: [0.61, 0.13],
        line_left_m: [0.73, 0.18],
        line_left_n: [0.6, 0.2],
        line_left_o: [0.42, -0.26],
        line_left_p: [0.54, -0.33],
        line_left_q: [0.64, -0.2],

        
    };

    const vertices = [
        ...object_dioda.line_top_d, ...object_dioda.line_top_color,
        ...object_dioda.line_top_c, ...object_dioda.line_top_color, 
        ...object_dioda.line_top_h, ...object_dioda.line_top_color, 
        ...object_dioda.line_top_h, ...object_dioda.line_top_color, 
        ...object_dioda.line_top_g, ...object_dioda.line_top_color,
        ...object_dioda.line_top_d, ...object_dioda.line_top_color,
         //  30
        ...object_dioda.line_top_c, ...object_dioda.line_top_color,
        ...object_dioda.line_top_i, ...object_dioda.line_top_color, 
        ...object_dioda.line_top_j, ...object_dioda.line_top_color, 
        ...object_dioda.line_top_j, ...object_dioda.line_top_color, 
        ...object_dioda.line_top_h, ...object_dioda.line_top_color,
        ...object_dioda.line_top_c, ...object_dioda.line_top_color,
        // 60

        // gambar kanan
        ...object_dioda_2.line_left_k, ...object_dioda_2.line_left_color,
        ...object_dioda_2.line_left_l, ...object_dioda_2.line_left_color,
        ...object_dioda_2.line_left_m, ...object_dioda_2.line_left_color,
        ...object_dioda_2.line_left_m, ...object_dioda_2.line_left_color,
        ...object_dioda_2.line_left_n, ...object_dioda_2.line_left_color,
        ...object_dioda_2.line_left_k, ...object_dioda_2.line_left_color, 
        //90
        ...object_dioda_2.line_left_k, ...object_dioda_2.line_left_color,
        ...object_dioda_2.line_left_o, ...object_dioda_2.line_left_color,
        ...object_dioda_2.line_left_p, ...object_dioda_2.line_left_color,
        ...object_dioda_2.line_left_p, ...object_dioda_2.line_left_color,
        ...object_dioda_2.line_left_l, ...object_dioda_2.line_left_color,
        ...object_dioda_2.line_left_k, ...object_dioda_2.line_left_color, 
       //120
        ...object_dioda_2.line_left_l, ...object_dioda_2.line_left_color,
        ...object_dioda_2.line_left_p, ...object_dioda_2.line_left_color,
        ...object_dioda_2.line_left_q, ...object_dioda_2.line_left_color,
        ...object_dioda_2.line_left_q, ...object_dioda_2.line_left_color,
        ...object_dioda_2.line_left_m, ...object_dioda_2.line_left_color,
        ...object_dioda_2.line_left_l, ...object_dioda_2.line_left_color, 
        
    ];

    var buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);


    var vertexShaderSource = `
        attribute vec2 aPosition;
        attribute vec3 aColor;
        varying vec3 vColor;
        uniform float uChange;
        void main() {
            gl_Position = vec4(aPosition.x, aPosition.y, 1.0, 1.0);
            vColor = aColor;
        }
    `;

    var fragmentShaderSource = `
        precision mediump float;
        varying vec3 vColor;
        void main() {
            gl_FragColor = vec4(vColor, 1.0);
        }
    `;

    var vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, vertexShaderSource);
    var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader, fragmentShaderSource);


    gl.compileShader(vertexShader);
    gl.compileShader(fragmentShader);


    var shaderProgram = gl.createProgram();


    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);


    gl.linkProgram(shaderProgram);


    gl.useProgram(shaderProgram);


    var aPosition = gl.getAttribLocation(shaderProgram, "aPosition");
    gl.vertexAttribPointer(
        aPosition,
        2,
        gl.FLOAT,
        false,
        5 * Float32Array.BYTES_PER_ELEMENT,
        0
    );
    gl.enableVertexAttribArray(aPosition);
    var aColor = gl.getAttribLocation(shaderProgram, "aColor");
    gl.vertexAttribPointer(
        aColor,
        3,
        gl.FLOAT,
        false,
        5 * Float32Array.BYTES_PER_ELEMENT,
        2 * Float32Array.BYTES_PER_ELEMENT
    );
    gl.enableVertexAttribArray(aColor);

    var freeze = false;
    // Interactive graphics with mouse
    function onMouseClick(event) {
        freeze = !freeze;
    }
    document.addEventListener("click", onMouseClick);
    // Interactive graphics with keyboard
    function onKeydown(event) {
        if (event.keyCode == 32) freeze = true;
    }

    function onKeyup(event) {
        if (event.keyCode == 32) freeze = false;
    }
    document.addEventListener("keydown", onKeydown);
    document.addEventListener("keyup", onKeyup);

    var speed = 0.0195;
    var change = 0;
    var uChange = gl.getUniformLocation(shaderProgram, "uChange");

    function moveVertices() {

        if (vertices[96] < -1.0 || vertices[116] > 1.0) {
            speed = speed * -1;
        }

        for (let i = 61; i < vertices.length; i += 5) {
            vertices[i] = vertices[i] + speed;
        }
    }


    function render() {
        moveVertices();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
        change = change + speed;
        gl.uniform1f(uChange, change);

        gl.clearColor(0.760, 0.633, 0.380, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT);
        var primitive = gl.TRIANGLES;
        var offset = 0;
        var nVertex = 30;
        gl.drawArrays(primitive, offset, nVertex);
        requestAnimationFrame(render);
    }
    requestAnimationFrame(render);
}