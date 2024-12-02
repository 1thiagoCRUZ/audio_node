const path = require("path");
const fileService = require('../services/fileServices');

const timestamp = Date.now();

const date = new Date(timestamp);

const day = date.getDate(); 
const month = date.getMonth() + 1; 
const year = date.getFullYear(); 


module.exports = {
    
    uploadFile: async (req, res) => {
        try {

            if (!req.file) {
                return res.status(400).json({ error: 'Nenhum arquivo enviado.' });
            }

            const originalName = req.file.originalname; 
            const fileExtension = path.extname(originalName);
            const fileName = `Reuniao-${day}-${month}-${year}${fileExtension}`; 

            req.file.filename = fileName;  

           
            fileService.uploadFile(req.file, (error, publicUrl) => {
                if (error) {
                    return res.status(500).json({ error: 'Erro ao fazer o upload do arquivo.', details: error.message });
                }

                return res.status(200).json({ message: 'Arquivo enviado com sucesso.', url: publicUrl });
            });
        } catch (err) {
            console.error('Erro no controller:', err);
            return res.status(500).json({ error: 'Erro inesperado.', details: err.message });
        }
    }
};
