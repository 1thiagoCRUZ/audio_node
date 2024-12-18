const path = require("path");
const fileService = require("../services/fileServices");

const timestamp = Date.now();
const date = new Date(timestamp);
const day = date.getDate();
const month = date.getMonth() + 1;
const year = date.getFullYear();

let fileCounter = 0; 

module.exports = {
    uploadFile: async (req, res) => {
        try {
            if (!req.files || req.files.length === 0) {
                return res.status(400).json({ error: "Nenhum arquivo enviado." });
            }

            const file = req.files[0];
            const originalName = file.originalname;
            const fileExtension = path.extname(originalName);

            fileCounter += 1;
            const fileName = `Reuniao-${day}-${month}-${year}-${fileCounter}${fileExtension}`;

            file.filename = fileName;

            fileService.uploadFile(file, (error, publicUrl) => {
                if (error) {
                    return res
                        .status(500)
                        .json({ error: "Erro ao fazer o upload do arquivo.", details: error.message });
                }

                return res.status(200).json({ message: "Arquivo enviado com sucesso.", url: publicUrl });
            });
        } catch (err) {
            console.error("Erro no controller:", err);
            return res.status(500).json({ error: "Erro inesperado.", details: err.message });
        }
    },
};
