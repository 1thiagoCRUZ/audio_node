const supabase=require("../config/database"),path=require("path");module.exports={uploadFile:async(o,a)=>{try{console.log("Chamada para upload de arquivos:"),console.log("Arquivo:",o);const r=o.buffer,e=o.filename,{data:s,error:u}=await supabase.storage.from("audios").upload(e,r,{cacheControl:"3600",upsert:!1});if(u)return console.error("Erro ao fazer o upload do arquivo:",u.message),a(u,null);console.log("Arquivo enviado com sucesso:",s);return a(null,supabase.storage.from("audios").getPublicUrl(e).publicURL)}catch(o){return console.error("Erro inesperado no upload:",o),a(o,null)}}};