const {PythonShell} = require('python-shell');

function caption(app){
    app.post("/caption",
        (req, res) => {
            let options = {
                mode: 'text',
                // pythonPath: 'path/to/python',
                pythonOptions: ['-u'], // get print results in real-time
                // scriptPath: 'path/to/my/scripts',
                args: [req.body.id]
            };

            PythonShell.run('caption.py', options, function (err, results) {
                if (err) {
                    console.log(err);
                    throw res.status(500);
                }
                // results is an array consisting of messages collected during execution
                res.status(200).json({result: results.join(' ')});
            });
        })
}

module.exports = caption;