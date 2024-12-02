const supabase = require('../config/database'); 
const path = require('path');

module.exports = {
    uploadFile: async (file, cb) => {
        try {
            console.log('Chamada para upload de arquivos:');
            console.log('Arquivo:', file);

            const fileBuffer = file.buffer;
            const fileName = file.filename;  

    
            const { data, error } = await supabase.storage
                .from('audios')  
                .upload(fileName, fileBuffer, {
                    cacheControl: '3600',
                    upsert: false 
                });

            if (error) {
                console.error('Erro ao fazer o upload do arquivo:', error.message);
                return cb(error, null);
            }

            console.log('Arquivo enviado com sucesso:', data);

            
            const publicUrl = supabase
                .storage
                .from('audios')
                .getPublicUrl(fileName).publicURL;

            return cb(null, publicUrl); 
        } catch (err) {
            console.error('Erro inesperado no upload:', err);
            return cb(err, null);
        }
    }
};
