def checkLuhn():
    cardNo = Element('card-number').element.value
    nDigits = len(cardNo)
    nSum = 0
    isSecond = False
   
    for i in range(nDigits - 1, -1, -1):
        d = ord(cardNo[i]) - ord('0')
   
        if (isSecond == True):
            d = d * 2

        nSum += d // 10
        nSum += d % 10
 
        isSecond = not isSecond
    
    if (nSum % 10 == 0):
        Element('validity').write("Valid Card");
    else:
        Element('validity').write("Invalid Card");