import os

def contar_linhas(caminho_base):
    total_linhas = 0
    for raiz, _, arquivos in os.walk(caminho_base):
        # Ignorar a pasta "assets/utils"
        # if ("public" in raiz.replace("\\", "/")) or ("node_modules" in raiz.replace("\\", "/")):
        #     continue
        
        for arquivo in arquivos:
            if arquivo.endswith(".jsx") or arquivo.endswith(".css"):  # Apenas arquivos Python
                caminho_arquivo = os.path.join(raiz, arquivo)
                with open(caminho_arquivo, "r", encoding="utf-8") as f:
                    linhas = f.readlines()
                    num_linhas = len([linha for linha in linhas if linha.strip()])  # Ignora linhas em branco
                    total_linhas += num_linhas
                    print(f"{arquivo}: {num_linhas} linhas")
    print(f"\n🔹 Total de linhas de código: {total_linhas}")

# Execute o script na pasta raiz do seu projeto
contar_linhas("src")  # "." significa a pasta atual