
#definir função para criar combinações
def createCombinations(lst, n):
    """
        lst (lista): lista de elementos em que se quere combinar
        n(inteiro): número de combinações
    """
    
    if n == 0:
        return [[]]

    l =[]
    for i in range(0, len(lst)):
        
        m = lst[i]
        remLst = lst[i + 1:]
        
        for p in createCombinations(remLst, n-1):
            l.append([m]+p)

    return l

#entradas do sistema
galao=float(input('Insira o volume do galão:  '))
print('Digite o volume das garrafas necessarias (quando terminar de digitar de ENTER)')
garrafas = []
n=1
while True:
    inp = input('Garrafa '+str(n)+' : ')
    if inp == "":
        break
    n+=1
    garrafas.append(float(inp))

#cacula todas as combinações possiveis entre as entradas, calcula a soma entre elas e o resto e salva em um dicionario
d=dict()
for i in range(1,len(garrafas)+1):
    for c in n_length_combo(garrafas,i):
        if(galao-sum(c)<=0):
            d[tuple(c)]=galao-sum(c)

#caso o dicionario esteja vazio o sistema da uma respostas
if(len(d)==0):
    print("A soma do volume das garrafas é insuficiente para encher o galão, com o total de %0.2fL"%sum(garrafas))
else:
    #senão, ele verifica qual o que tem o menor resto e  que possui menor elementos
    sort= sorted(d, key=d.get, reverse=True)
    sobra=d[sort[0]]
    chosen=sort[0]
    for lista,val in d.items():
        if(val==sobra):
            if(len(lista)<len(chosen)):
                chosen=lista
    #saida da resposta
    print(str([str(s) + "L" for s in chosen])  + ", sobra %0.2fL"%abs(sobra))

              




