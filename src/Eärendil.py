import csv,sys,operator

def csvToList(filename):
    temp = []
    with open(filename, 'r') as f:
        reader = csv.reader(f)
        for row in reader:
            temp.append(row)
    f.close()
    return temp

trail_names = csvToList('trails.csv')

def initiateTrail(name):
    latLon = []
    specIds = []
    trailIds = []
    trail = [name,latLon,specIds,trailIds]
    return trail

#FRONT COUNTRY
cold_springs = initiateTrail('Cold Springs')
jesusita = initiateTrail('Jesusita')
romero = initiateTrail('Romero')
san_ysidro = initiateTrail('San Ysidro')
rattlesnake = initiateTrail('Rattlesnake')
tunnel = initiateTrail('Tunnel')
gaviota = initiateTrail('Gaviota')
hot_springs = initiateTrail('Hot Springs')
buena_vista = initiateTrail('Buena Vista')
arroyo_burro = initiateTrail('Arroyo Burro')
arlington = initiateTrail('Arlington')
inspiration = initiateTrail('Inspiration')
mcmenemy = initiateTrail('McMenemy')
san_antonio_creek = initiateTrail('San Antonio Creek')
franklin = initiateTrail('Franklin')
white_mountain = initiateTrail('White Mountain')
gibraltar_road = initiateTrail('Gibraltar Road')
front_country = ['Cold Springs','Jesusita','Romero','San Ysidro','Rattlesnake','Tunnel','Gaviota','Hot Springs',
                 'Buena Vista','Arroyo Burro','Arlington','Inspiration','McMenemy','San Antonio Creek','Franklin',
                 'White Mountain','Gibraltar Road']
#TOWN and BEACH
elings = initiateTrail('Elings')
carp = initiateTrail('Carpinteria')
hendrys = initiateTrail("Hendrys Beach")
goleta_beach = initiateTrail('Goleta Beach')
ucsb = initiateTrail('UCSB')
more_mesa = initiateTrail('More Mesa')
butterfly = initiateTrail('Butterfly Beach')
stevens = initiateTrail("Steven's Park")

city_beach = ['Elings','Carpinteria','Hendrys Beach','Goleta Beach','UCSB',
              'More Mesa','Butterfly Beach',"Steven's Park"]
#BACKCOUNTRY
forbush = initiateTrail('Forbush')
divide = initiateTrail('Divide Peak')
blue_canyon = initiateTrail('Blue Canyon')
matias = initiateTrail('Matias')
fremont = initiateTrail('Fremont')
grotto = initiateTrail('Grotto & Mercury Mine')
camuesa = initiateTrail('Camuesa')
wcc = initiateTrail('West Camino Cielo')
snyder = initiateTrail('Snyder')
santa_cruz = initiateTrail('Santa Cruz')
mono = initiateTrail('Mono')
aliso = initiateTrail('Aliso')
santa_ynez_river = initiateTrail('Santa Ynez River')
little_pine = initiateTrail('Little Pine')
manzana = initiateTrail('Manzana')
tequepis = initiateTrail('Tequepis')
alexander_peak = initiateTrail('Alexander Peak')
grass_mountain = initiateTrail('Grass Mountain')
lost_valley = initiateTrail('Lost Valley')
hurricane_deck = initiateTrail('Hurricane Deck')
cozy_dell = initiateTrail('Cozy Dell')
davey_brown = initiateTrail('Davey Brown')
figueroa = initiateTrail('Figueroa')
little_caliente = initiateTrail('Little Caliente')
buckhorn = initiateTrail('Buckhorn')
potrero = initiateTrail('Potrero')
la_jolla = initiateTrail('La Jolla')
upper_oso = initiateTrail('Upper Oso')
back_country = ['Forbush','Divide Peak','Blue Canyon','Matias','Fremont','Grotto & Mercury Mine','Camuesa','West Camino Cielo',
                'Snyder','Santa Cruz','Mono','Aliso','Santa Ynez River','Little Pine','Manzana','Tequepis','Alexander Peak',
                'Grass Mountain','Lost Valley','Hurricane Deck','Cozy Dell','Davey Brown','Figueroa','Little Caliente',
                'Buckhorn','Potrero','La Jolla','Upper Oso']

all_trails = [cold_springs,jesusita,romero,san_ysidro,rattlesnake,tunnel,gaviota,hot_springs,
                buena_vista,arroyo_burro,arlington,inspiration,mcmenemy,san_antonio_creek,franklin,white_mountain,
                gibraltar_road,elings,carp,hendrys,goleta_beach,ucsb,
                more_mesa,butterfly,stevens,forbush,divide,blue_canyon,
                matias,fremont,grotto,camuesa,wcc,snyder,santa_cruz,mono,aliso,santa_ynez_river,little_pine,
                manzana,tequepis,alexander_peak,grass_mountain,lost_valley,hurricane_deck,cozy_dell,davey_brown,
                figueroa,little_caliente,buckhorn,potrero,la_jolla,upper_oso]

others = []

for t in trail_names:
    # START FRONT COUNTRY
    if (t[2].find('Cold') != -1 or t[2] == 'CS excursion' or t[2].find('CS Pylon') != -1 or t[2] == 'CS ford' or t[2] == 'CS Alt Side2' or t[2] == 'CS West Side1' or t[2] == 'CS Weather Station' or t[2] == 'CS Homestead' or t[2] == 'CS hobbit' or t[2].find('MP Alt') != -1 or t[2] == 'CS Watertank' or t[2] == 'CS Alt Side Trail 1' or t[2].find('CS Powerlines') != -1 or t[2].find('Tangerine') != -1 or t[2].find('Montecito Peak') != -1 or t[2].find('CS West Entrance') != -1) and t[2] != 'Coldwater Camp' and t[2] != 'Cold Springs Tavern':
        cold_springs[3].append(t[0])
    elif t[2].find('Rom') != -1 and t[2].find('Blue') == -1 and t[2].find('Buena') == -1 and t[2].find('RomBV') == -1:
        romero[3].append(t[0])
    elif t[2].find('Jes') != -1 or t[2].find('San Roque Creek') != -1:
        jesusita[3].append(t[0])
    elif (t[2].find('Ysidro') != -1 or t[2].find('SY') != -1 or t[2].find('Old Pueblo') != -1) and t[2].find('SY2Franklin') == -1:
        san_ysidro[3].append(t[0])
    elif t[2].find('Rattle') != -1:
        rattlesnake[3].append(t[0])
    elif (t[2].find('Tunnel') != -1 or t[2].find('Razerback Ridge') != -1) and t[2].find('Tunnel View') == -1:
        tunnel[3].append(t[0])
    elif t[2].find('Tunnel View') != -1 or t[2].find('Gaviota') != -1 or t[2].find('Trespassers') != -1 or t[2].find('Cambell Tr') != -1:
        gaviota[3].append(t[0])
    elif t[2].find('Hot') != -1:
        hot_springs[3].append(t[0])
    elif t[2].find('Buena') != -1 or t[2].find('BV') != -1:
        buena_vista[3].append(t[0])
    elif (t[2].find('Arroyo') != -1 or t[2].find('AB Pylon') != -1 or t[2] == 'ABB Dry Ford' or t[2].find('AB Dirt') != -1 or t[2] == 'San Roque AB Ford' or t[2] == 'ABB Wet Ford' or t[2] == 'AB water supply' or t[2] == 'San Antonio Ford Top' or t[2] == 'San Antonio Ford 1') and t[2].find('CS Powerlines') == -1:
        arroyo_burro[3].append(t[0])
    elif (t[2].find('Arlington') != -1 or t[2].find('Cathedral') != -1) and t[2].find('Oaks') == -1:
        arlington[3].append(t[0])
    elif t[2].find('Inspir') != -1 or t[2].find('Seven Falls') != -1:
        inspiration[3].append(t[0])
    elif t[2].find('Menem') != -1 or t[2].find('Girard') != -1 or t[2].find('Saddlerock') != -1:
        mcmenemy[3].append(t[0])
    elif t[2].find('San Antonio') != -1 and t[2] != 'San Antonio Ford Top' and t[2] != 'San Antonio Ford 1':
        san_antonio_creek[3].append(t[0])
    elif t[2].find('Franklin') != -1 or t[2] == 'Carp 1 FRd.':
        franklin[3].append(t[0])
    elif t[2].find('White M') != -1 or t[2] == 'White 2 Nowhere':
        white_mountain[3].append(t[0])
    elif t[2].find('Gib') != -1:
        gibraltar_road[3].append(t[0])
    # START CITY
    elif t[2].find('Eling') != -1:
        elings[3].append(t[0])
    elif t[2].find('Carp') != -1 and t[2] != 'Carp 1 FRd.':
        carp[3].append(t[0])
    elif t[2].find('Hendr') != -1:
        hendrys[3].append(t[0])
    elif t[2].find('Goleta') != -1:
        goleta_beach[3].append(t[0])
    elif t[2].find('UCSB') != -1:
        ucsb[3].append(t[0])
    elif t[2].find('More Mesa') != -1:
        more_mesa[3].append(t[0])
    elif t[2].find('Butterfl') != -1 and t[2].find('Coronado') == -1:
        butterfly[3].append(t[0])
    elif t[2].find('Steven') != -1:
        stevens[3].append(t[0])
    # START BACKCOUNTRY
    elif t[2].find('Forbu') != -1 or t[2].find('Gidney') != -1 or t[2] == 'For2Grot Pylon':
        forbush[3].append(t[0])
    elif t[2].find('Divide Peak') != -1:
        divide[3].append(t[0])
    elif t[2].find('Blue') != -1 or t[2].find('Cottam') != -1:
        blue_canyon[3].append(t[0])
    elif t[2].find('Matias') != -1:
        matias[3].append(t[0])
    elif t[2].find('Fremont') != -1:
        fremont[3].append(t[0])
    elif t[2].find('Grotto') != -1 or t[2] == 'Mercury Mine Loop':
        grotto[3].append(t[0])
    elif t[2].find('Camuesa') != -1 or t[2] == 'Santa Cruz Stub':
        camuesa[3].append(t[0])
    elif t[2].find('West Camino Cielo') != -1:
        wcc[3].append(t[0])
    elif t[2].find('Snyder') != -1:
        snyder[3].append(t[0])
    elif (t[2].find('Santa Cruz') != -1 or t[2].find('Old Mine') != -1 or t[2].find('19 Oaks') != -1) and t[2] != 'Santa Cruz Stub':
        santa_cruz[3].append(t[0])
    elif t[2].find('Mono') != -1:
        mono[3].append(t[0])
    elif t[2].find('Santa Ynez R') != -1:
        santa_ynez_river[3].append(t[0])
    elif t[2].find('Little Pi') != -1:
        little_pine[3].append(t[0])
    elif t[2].find('Manzana') != -1:
        manzana[3].append(t[0])
    elif t[2].find('Tequepis') != -1:
        tequepis[3].append(t[0])
    elif t[2].find('Alexander') != -1:
        alexander_peak[3].append(t[0])
    elif t[2].find('Grass M') != -1 or t[2].find('Midland') != -1:
        grass_mountain[3].append(t[0])
    elif t[2].find('Lost Val') != -1 or t[2] == 'Lost Creek':
        lost_valley[3].append(t[0])
    elif t[2].find('Hurricane') != -1:
        hurricane_deck[3].append(t[0])
    elif t[2].find('Cozy') != -1:
        cozy_dell[3].append(t[0])
    elif t[2].find('Davey') != -1 or t[2].find('Davy') != -1:
        davey_brown[3].append(t[0])
    elif t[2].find('Figu') != -1:
        figueroa[3].append(t[0])
    elif t[2].find('Little Cal') != -1:
        little_caliente[3].append(t[0])
    elif t[2].find('Buckhorn') != -1:
        buckhorn[3].append(t[0])
    elif t[2].find('Potrero') != -1:
        potrero[3].append(t[0])
    elif t[2].find('La Jolla') != -1:
        la_jolla[3].append(t[0])
    elif t[2].find('Aliso') != -1:
        aliso[3].append(t[0])
    elif t[2].find('Upper Oso') != -1:
        upper_oso[3].append(t[0])
    else:
        others.append(t[2])

'''
0x1 => this sighting of a blooming plant should continue a previous one
0x2 => this sighting of a living plant should continue the plant's aliveness
0x4 => this sighting of a budding plant should continue a previous bud sighting
0x8 => this sighting of fruit should continue the fact the plant is fruiting
0x10 => this sighting of new leaves should continue the fact that the plant has new leaves
0x40 => this sighting of a plant blooming in the front country should continue a preevious sighting of a plant blooming int he front country. (not sure this is used)
0x80 => ditto for plants in the santa ynez value.

The following are precomputed values to improve speed (I hope)
0x100 => this sighting is worth displaying on the map
0x200 => this sighting is worth displaying on the map when showing things that have bloomed in the last year
0x400 => ditto for the last 6 months

0x800 => this sighting is useful when calculating a blooming calendar (often there are lots of sightings of a species blooming on a given day. I only need one. This is designed to speed things up.
0x1000 => ditto for aliveness
0x2000 => ditto for blooming in the front country
0x4000 => ditto for blooming in the santa yenz valley
0x8000 => sighting happens in the front country
0x10000 => sighting happens in the santa yenz watershed

0x1000000 questionable ID (not sure I got the species right)
0x2000000 blooming at an unusual time (don't think this is used)
0x4000000 verified by someone who's better at this than I am
0x8000000 introduced species
0x10000000 did not record the time, only the date for this sighting
0x20000000 don't show the exact location on the map (some plants are rare and people illegally collect them so it's best not to make things too easy for them. Instead of a dot on the map, show a 100x100 meter square with the sighting somewhere inside)
'''

areas = ['','Santa Barbara','San Luis Obispo','Ventura','Los Angeles','Kern']
trailClasses = ['unspecified', 'complex', 'Seaside', 'Riparian','Forest', 'Chaparral', 'Summit','Urban', 'Agricultural','Montain', 'Swamp', 'Grassland','SB Front Country', 'SB Back Country', 'Paradise Rd', 'Wilderness','Ojai', 'Gaviota','Santa Ynez Watershed']

#FUNCTIONS
def csvToDict(fileName,idColumnName):
    data = {}
    with open(fileName, 'r') as f:
        #csv.field_size_limit(sys.maxsize) REMOVE?
        reader = csv.DictReader(f)
        i = 0
        for row in reader:
            if idColumnName != '':
                data[row[idColumnName]] = row
            else:
                data[i] = row
                i += 1
    f.close()
    return data

def writeCSV(fileName,listName):
    with open(fileName,'wb') as w:
        writer = csv.writer(w)
        writer.writerows(listName)
    w.close()

def writeHtml(name,data):
    with open(name,'w') as w:
        w.write(data)

def createFileName(name,fileType):
    name = name.lower()
    name = name.replace(' ','-')
    name = name.replace('.','')
    name = name.replace('(','-')
    name = name.replace(')','-')
    name += fileType
    return name

def aliveOrBloom(mask):
    if mask&0x1:
        return 'bloom continued'
    elif mask&0x800 or mask&0x2000 or mask&0x4000:
        return 'bloom'
    elif mask&0x2:
        return 'alive continued'
    elif mask&0x1000:
        return 'alive'
    else:
        return 'null'

def openHTML(fileName):
    with open(fileName) as f:
        content = f.read()
    return content

def parseBitMask(mask):
    string = ''
    if mask&0x1:
        string += 'epiphyte, '
    if mask&0x2:
        string += 'parasite, '
    if mask&0x4:
        string += 'evergreen, '
    if mask&0x8:
        string += 'deciduous, '
    if mask&0x10:
        string += 'drought deciduous, '
    if mask&0x20:
        string += 'frost deciduous, '
    if mask&0x40:
        string += 'introduced, '
    if mask&0x80:
        string += 'annual, '
    if mask&0x100:
        string += 'biannual, '
    if mask&0x200:
        string += 'perennial, '
    if mask&0x400:
        string += 'vine, '
    if mask&0x800:
        string += 'shrub, '
    if mask&0x1000:
        string += 'tree, '
    if mask&0x2000:
        string += 'flowering plant, '
    if mask&0x4000:
        string += 'fern, '
    if mask&0x8000:
        string += 'plant, '
    if mask&0x10000:
        string += 'animal, '
    if mask&0x20000:
        string += 'fungus, '
    string = string[:-2]
    return string

def parseColor(mask):
    string = ''
    if mask&1:
        string += 'white, '
    if mask&2:
        string += 'red, '
    if mask&4:
        string += 'blue, '
    if mask&8:
        string += 'yellow, '
    if mask&16:
        string += 'brown, '
    if mask&32:
        string += 'green, '
    string = string[:-2]
    return string

def createMapJs(specId):
    subSightingsJs = 'var subSightings = ['
    lonLats = [sightings[x]['Lon'] + ',' + sightings[x]['Lat'] for x in sightings if sightings[x]['SpeciesId'] == specId]
    lonLats = list(set(lonLats))
    for l in lonLats:
        if l != '181,91':
            subSightingsJs += '[' + l + '],'
    subSightingsJs = subSightingsJs[:-1]
    subSightingsJs += '];'
    return subSightingsJs

def buildAssHtml(assList):
    assHtml = '<div class="associates"><h2>Seen with...</h2><div class="list">'
    dupes = [1628,1676,1806,1989,2146,2182,2222,2258]
    for ass in assList:
        try:
            ass = int(ass)
            if ass > 1572 and ass not in dupes:
                assHtml += '<div class="associate">'
                ass = species[str(ass)]
                if ass['FlowerImage'] != '-1':
                    flowerId = ass['FlowerImage']
                elif ass['PlantImage'] != '-1':
                    flowerId = ass['PlantImage']
                assHtml += createImgHtml(flowerId,'../teasers-150',False)
                flowerFileName = createFileName(ass['Name'],'.html')
                assHtml += '<p><a class="name" href="' + flowerFileName + '">' + ass['Name'] + '</a></p>'
                if ass['CommonName'] != 'NULL':
                    assHtml += '<p class="common-name">' + ass['CommonName'] + '</p>'
                assHtml += '</div>'     
        except ValueError:
            continue
    assHtml += '</div></div>'
    return assHtml

# takes a specId and merges a masquerading species id sightings (duplicates)
def masqueradeId(specId):
    dupes = ['1627','1675','1805','1988','2145','2181','2221','2257']
    for d in dupes:
        if specId == d:
            altId = str(int(specId) + 1)
            print(specId,altId)
            return altId
    return 'None'

def sightingsData(specId, hideRare):
    altId = masqueradeId(specId)
    if altId == 'None':
        subSightings = [sightings[x] for x in sightings if sightings[x]['SpeciesId'] == specId]
    else:
        subSightings = [sightings[x] for x in sightings if sightings[x]['SpeciesId'] == specId or sightings[x]['SpeciesId'] == altId]
    sightingsCount = len(subSightings)
    subSightings.reverse()
    subTrails = []
    areaDict = {}
    assList = []
    #create sightings table
    table = '<table><thead><th></th><th>Date</th><th>Lat</th><th>Lon</th><th>Altitude</th><th>Temperature</th><th>Humidity</th><th>Trail</th></thead></tbody>'
    for s in subSightings:
        if subSightings.index(s)%2 == 0:
            skip = 'odd'
        else:
            skip = 'even'
        table += '<tr class=' + skip + '><td class="locate"><div class="scope"></div></td><td>' + s['Date'] + '</td>'
        if s['Lat'] != '91' and s['Lon'] != '181' and hideRare != True:
            table += '<td class="lat">' + s['Lat'] + '</td>' + '<td class="lon">' + s['Lon'] + '</td>'
        else:
            table += '<td>N/A</td><td>N/A</td>'
        if s['Alt'] != '-9999':
            table += '<td>' + str(int(float(s['Alt'])*0.3048)) + 'm. (' + str(int(float(s['Alt']))) + 'ft.)</td>'
        else:
            table += '<td>N/A</td>'
        if s['Temp'] != '-9999':
            celcius = int(round(int(s['Temp'])/100))
            farenheit = int(round((celcius * 9/5) + 32))
            table += '<td>' + str(celcius) + '&#176;C (' + str(farenheit) + '&#176;F)</td>'
        else:
            table += '<td>N/A</td>'
        if s['Humidity'] != '-9999':
            table += '<td>' + str(int(round(int(s['Temp'])/100))) + '%</td>'
        else:
            table += '<td>N/A</td>'
        if s['TrailId'] != '-1':
            table += '<td>' + trails[s['TrailId']]['Name'] + '</td>'
            tArea = areas[int(s['AreaId'])]
            tClass = trailClasses[int(trails[s['TrailId']]['Classification'])]
            tName = trails[s['TrailId']]['Name']
            if tArea in areaDict:
                if tClass in areaDict[tArea]:
                    if tName in areaDict[tArea][tClass]:
                        continue
                    else:
                        areaDict[tArea][tClass].append(tName)
                else:
                    areaDict[tArea][tClass] = [tName]
            else:
                areaDict[tArea] = {tClass: [tName]}
        else:
            table += '<td>N/A</td>'
        if s['Associates'] != 'NULL':
            # add to table with link to associate?
            assList += s['Associates'].split(',')
        # Add to trail array
        if s['TrailId'] != '-1' and s['Lat'] != '91' and s['Lon'] != '181':
            for tr in all_trails:
                if s['TrailId'] in tr[3]:
                    if hideRare != True:
                        tr[1].append([s['Lat'],s['Lon']])
                    if specId not in tr[2]:
                        tr[2].append(specId)
            
    table += '</tr></tbody></table>'
    #BUILD TRAIL LIST
    ul = '<ul>'
    for area in sorted(areaDict):
        ul += '<li><span>' + area + '</span><ul>'
        for aClass in sorted(areaDict[area]):
            ul += '<li><span class="closed">' + aClass + '</span><ul>'
            areaDict[area][aClass].sort()
            for aT in areaDict[area][aClass]:
                ul += '<li>' + aT + '</li>'
            ul += '</ul></li>'
        ul += '</ul></li>'
    ul += '</ul>'

    #BUILD ASSOCIATE HTML
    assList = list(set(assList))
    if len(assList) != 0:
        assHtml = buildAssHtml(assList)
    else:
        assHtml = ''

    #create trail list
    return [str(sightingsCount),table,ul,assHtml]
        
def buildTaxonomy(sid,taxList):
    for t in taxonomy:
        if taxonomy[t]['TaxonId'] == sid:
            taxList.append([taxonomy[t]['Name'],taxonomy[t]['Level'],taxonomy[t]['JepsonId']])
            if taxonomy[t]['ParentId'] != '-1' and len(taxList) < 13:
                buildTaxonomy(taxonomy[t]['ParentId'],taxList)

#months = {0:'J',2:'F',4:'M',6:'A',8:'M',10:'J',12:'J',14:'A',16:'S',18:'O',20:'N',22:'D'}
'''
def checkPrevMonth(months, index):
    if months[index] == 3:
        months[index] = 2
    if index != 0:
        if months[index-1] != 2:
            months[index-1] = 2
            checkPrevMonth(months, index-1)
        else:
            print (months, 'here')
            return months
    else:
        print (months, 'there')
        return months

def cycleMonths(months):
    print (months, 'new cycle')
    if months.count(3) > 0:
        newMonths = checkPrevMonth(months, months.index(3))
        cycleMonths(newMonths)
    else:
        return months

def buildCalendar(specId):
    collection = []
    years = []
    for sight in sightings:
        if sightings[sight]['SpeciesId'] == specId and aliveOrBloom(int(sightings[sight]['Flags'])) != 'null':
            collection.append([sightings[sight]['Date'],aliveOrBloom(int(sightings[sight]['Flags']))])
            years.append(sightings[sight]['Date'][0:4])
    years = list(set(years))
    years.sort()
    years.reverse()
    calendar = '<div class="calendar">'
    yearCombo = []
    for year in years:
        yearMonths = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
        for c in collection:
            if c[0][0:4] == year:
                month = int(c[0][5:7])
                month = (month-1)*2
                day = int(c[0][8:10])
                if day >= 15:
                    month = month+1
                if yearMonths[month] == 0:
                    if c[1] == 'bloom continued':
                        yearMonths[month] = 3
                    elif c[1] == 'bloom':
                        yearMonths[month] = 2
                    elif c[1] == 'alive':
                        yearMonths[month] = 1
                    elif c[1] == 'alive continued':
                        yearMonths[month] = 4
                    else:
                        print (c[1])
        yearCombo += yearMonths
    yearCombo.reverse()
    for index, val in enumerate(yearCombo):
        if val == 3:
            orig = False
            start = index
            while orig == False:
                start += 1
                if start < len(yearCombo):
                    if yearCombo[start] != 2:
                        yearCombo[start] = 2
                    else:
                        orig = True
                else:
                    orig = True
    yearCombo.reverse()
    for year in years:
        yearDiv = '<p>'+year+'</p><div class="year">'
        x = 0
        yearMonths = yearCombo[:24]
        yearCombo = yearCombo[24:]
        for val in yearMonths:
            if val == 0:
                color = 'white'
            elif val == 1:
                color = 'green'
            elif val == 2:
                color = 'red'
            elif val == 3:
                color = 'blue'
            elif val == 4:
                color = 'yellow'
            if x == 0:
                yearDiv += '<div class="month"><span>' + months[x] + '</span>'
            elif x%2 == 0:
                yearDiv += '</div><div class="month"><span>' + months[x] + '</span>'
            yearDiv += '<div class="half-month ' + color + '"></div>'
            x += 1
        yearDiv += '</div></div>'
        calendar += yearDiv
    calendar += '</div>'
    return calendar'''

def createImgHtml(imageId,folder,lazy):
    if lazy != True:
        imageHTML = '<img src="'
    else:
        imageHTML = '<img class="lazy" data-src="'
    if imageId in images:
        src = images[imageId]['Filename']
        src = folder + '/' + src
        imageHTML += src
    imageHTML += '" />'
    return imageHTML

def nameQuery(name,separator):
    name = name.replace(' ',separator)
    return name

def buildFlowerBox(s,index,escape):
    #BY FLOWERS HTML
    flowerFileName = escape + 'flower-collection/' + createFileName(species[s]['Name'],'.html')
    specie = '<div class="specie" data-specId="' + species[s]['TaxonId'] + '">'
    if species[s]['FlowerImage'] != '-1':
        flowerId = species[s]['FlowerImage']
    elif species[s]['PlantImage'] != '-1':
        flowerId = species[s]['PlantImage']
    elif species[s]['FruitImage'] != '-1':
        flowerId = species[s]['FruitImage']
    elif species[s]['ShootImage'] != '-1':
        flowerId = species[s]['ShootImage']
    elif species[s]['LeafImage'] != '-1':
        flowerId = species[s]['LeafImage']
    else:
        flowerId = '-1'
        #print (species[s]['TaxonId'])
    if index < 21:
        imageHTML = createImgHtml(flowerId,escape + 'teasers-225',False)
    else:
        imageHTML = createImgHtml(flowerId,escape + 'teasers-225',True)
    specie += '<a href="' + flowerFileName + '">' + imageHTML + '</a>'
    #calendarHTML = buildCalendar(species[s]['TaxonId'])
    #specie += calendarHTML
    specie += '<p><a class="name" href="' + flowerFileName + '">' + species[s]['Name'] + '</a></p>'
    if species[s]['CommonName'] != 'NULL':
        specie += '<p class="common-name">' + species[s]['CommonName'] + '</p>'
    if species[s]['Flags'] != 0:
        cats = parseBitMask(int(species[s]['Flags']))
        colors = parseColor(int(species[s]['Color']))
        specie += '<p class="flags">' + cats
        if colors != '':
            specie += '<span class="colors"> ' + colors + '</span></p>'
        else:
            specie += '</p>'
    specie += '</div>'
    return [specie,cats,flowerFileName,flowerId]

#INITIALIZE DATA
species = csvToDict('species.csv','TaxonId')
sightings = csvToDict('sightings.csv','')
images = csvToDict('images.csv','ImageId')
trails = csvToDict('trails.csv','TrailId')
taxonomy = csvToDict('taxonomy.csv','TaxonId')
starterHTML = openHTML('flower_starter.html')
flowerStarter = openHTML('starter.html')
hiResStarter = openHTML('hiResStarter.html')
mapStarter = openHTML('map_starter.js')
trailStarter = openHTML('trail_starter.js')

del species['1568']
del species['1569']
del species['1570']
del species['1571']
del species['1572']
# removes some duplicates - sightings for these are merged into another species note in comments below
del species['1628'] #1627
del species['1676'] #1675
del species['1806'] #1805
del species['1989'] #1988
del species['2146'] #2145
del species['2182'] #2181
del species['2222'] #2221
del species['2258'] #2257

species = dict(sorted(species.items(), key=lambda x:x[1]['Name']))

#TEST

'''test = buildCalendar('1817')
test = '<html><head><link rel="stylesheet" type="text/css" href="test.css"></head><body>' + test + '</body></html>'
writeHtml('test.html',test)'''

#CREATE HTML

html = '<div class="species-group">'
index = 0
for s in species:
    hiResFileName = 'hi-res/' + createFileName(species[s]['Name']+'-images','.html')
    specie = buildFlowerBox(s,index,'')
    html += specie[0]
    cats = specie[1]
    flowerFileName = specie[2]
    flowerId = specie[3]
    index += 1
    #FLOWER PAGE HTML ########
    rarity = species[s]['Rarity']
    hideRare = False
    if rarity != 'unranked':
        hideRare = True
        print(species[s]['Name'], rarity)
    if cats.find('flowering') != -1:
        mainLabel = 'Flower'
    elif cats.find('animal') != -1:
        mainLabel = 'Animal'
    else:
        mainLabel = 'Main'
    imageIds = [[mainLabel,species[s]['FlowerImage']],['Fruit',species[s]['FruitImage']],['Leaf',species[s]['LeafImage']],['Shoot',species[s]['ShootImage']],['Plant',species[s]['PlantImage']],['Bud',species[s]['BudImage']],['Fire recovery',species[s]['FireRecoveryImage']],['Mating',species[s]['MatingImage']],['Male',species[s]['MaleImage']],['Female',species[s]['FemaleImage']],['Tracks',species[s]['TracksImage']],['Main',species[s]['MainImage']]]
    flower = flowerStarter
    flower += '<h1><i>' + species[s]['Name'] + '</i>'
    if species[s]['CommonName'] != 'NULL':
        flower += ' (' + species[s]['CommonName'] + ')'
    flower += '</h1>'
    #TAXONOMY
    taxList = []
    buildTaxonomy(species[s]['TaxonId'],taxList)
    speciesJepson = taxList[0][2]
    if len(taxList) > 1:
        familyJepson = [taxList[1][2],taxList[1][0]]
    taxList.reverse()
    taxList.pop()
    taxString = '<table><thead><tr>'
    for t in taxList:
        if t[0] != '':
            taxString += '<th>' + t[1] + '</th>'
    taxString += '</tr><thead><tbody><tr>'
    for t in taxList:
        if t[0] != '':
            taxString += '<td>' + t[0] + '</td>'
    taxString += '</tbody></table>'
    flower += '<div class="taxonomy">' + taxString + '</div>'
    #MAP
    flower += '<div class="wrapper"><div class="map-wrapper" id="map-wrapper"><div id="map" class="map">'
    if hideRare == True:
        flower += '<h2 class="sightings-hidden">Sightings for this species are not displayed on the map due to endangerment</h2>'
    flower += '</div><button>Reset</button></div><div class="images-wrapper">'
    #IMAGES
    hiRes = hiResStarter
    for i in imageIds:
        if i[1] != '-1':
            imageHtml = createImgHtml(i[1],'../teasers-225', False)
            flower += '<div class="img-container">' + imageHtml + '<label>' + i[0] + '</label></div>'
            hiRes += createImgHtml(i[1],'../', False)
    flower += '<a href="../' + hiResFileName + '" target="_blank">HiRes Images</a>'
    #GENERAL INFO
    sightingsInfo = sightingsData(species[s]['TaxonId'],hideRare)
    flower += '</div>'
    flower += '<div class="general-info"><h2>General Information</h2><table><tr><th>Sightings:</th><td>' + sightingsInfo[0] + '</td></tr>'
    flower += '<tr><th>Type(s):</th><td>' + cats + '</td></tr>'
    if rarity != 'unranked':
        flower += '<tr><th>Rarity:</th><td><a href="https://www.cnps.org/rare-plants/cnps-rare-plant-ranks">' + rarity + '</a></td></tr>'
    flower += '</table>'
    flower += '<div class="trail-list"><h2>Trail List</h2>' + sightingsInfo[2] + '</div>'
    flower += '</div>'
    #SIGHTINGS TABLE
    flower += '<div class="sightings-wrapper"><h2>Sightings Table</h2><div class="table-wrapper">'
    flower += sightingsInfo[1] + '</div></div>'
    #ASSOCIATES
    flower += sightingsInfo[3]
    #EXTERNAL LINKS
    flower += '<div class="external-links"><h2>External Links</h2><ul>'
    if mainLabel != 'Animal':
        flower += '<li><a href="https://ucjeps.berkeley.edu/eflora/eflora_display.php?tid=' + speciesJepson + '">Jepson treatment for ' + species[s]['Name'] + '</a></li>'
        flower += '<li><a href="https://ucjeps.berkeley.edu/eflora/eflora_display.php?tid=' + familyJepson[0] + '">Jepson treatment for ' + familyJepson[1] + '</a></li>'
        flower += '<li><a href="https://www.calflora.org/cgi-bin/specieslist.cgi?namesoup=' + nameQuery(species[s]['Name'],'+') + '">Calflora</a></li>'
        flower += '<li><a href="https://calphotos.berkeley.edu/cgi/img_query?where-taxon=' + nameQuery(species[s]['Name'],'+') + '">Calphotos</a></li>'
    flower += '<li><a href="https://en.wikipedia.org/wiki/' + nameQuery(species[s]['Name'],'_') + '">Wikipedia</a></li>'
    ##### START MAKING MAP
    if hideRare != True:
        mapjs = createMapJs(species[s]['TaxonId'])
        mapjs = mapjs + mapStarter
        mapFileName = '../flower-collection/js/' + createFileName(species[s]['Name'],'.js')
        writeHtml(mapFileName,mapjs)
    #### FINAL HTML
    flower += '</div>'
    if hideRare != True:
        mapFileName = mapFileName.replace('../flower-collection/','')
        flower += '<script src="' + mapFileName + '"></script>'
    flower += '</body></html>'
    hiRes += '</body></html>'
    flower = flower.replace('<!-- META TITLE -->',species[s]['Name'])
    hiRes = hiRes.replace('<!-- META TITLE -->',species[s]['Name']+' Images')
    writeHtml('../' + flowerFileName,flower)
    writeHtml('../' + hiResFileName,hiRes)
    

starterHTML += html + '</div>'
starterHTML += '</body></html>'

with open('../flowers.html','w') as w:
    w.write(starterHTML)

# CREATES HTML & JS FOR BY TRAILS PAGE
trailjs = openHTML('../trails.js')
trailStarterHTML = openHTML('../trail_starter_html.html')
trailArrays = ''
for tr in all_trails:
    if len(tr[1]) > 0:
        name = tr[0]
        code_name = tr[0].lower()
        code_name = code_name.replace('&','')
        code_name = code_name.replace(' ','_')
        code_name = code_name.replace("'",'')
        trailgeos = '['
        for latlon in tr[1]:
            trailgeos += '[' + latlon[1] + ',' + latlon[0] + '],'
        trailgeos = trailgeos[:-1]
        trailgeos += '];'   
        #geoloc = 'var ' + code_name + '_geolocs = ' + trailgeos + '\n'
        geoloc = 'var ' + 'geolocs = ' + trailgeos + '\n'
        trailspecies = '['
        trailHtml = trailStarterHTML
        breadcrumb = '<h1>'+name+'</h1>'
        trailHtml = trailHtml.replace('<!-- TITLE INSERTED HERE -->',breadcrumb)
        trailHtml = trailHtml.replace('<!-- META TITLE -->',name)
        for ts in tr[2]:
            trailspecies += ts + ','
            temp = buildFlowerBox(ts, 0,'../')
            trailHtml += temp[0]
        trailspecies = trailspecies[:-1]
        trailspecies += '];'
        specArray = 'var ' + 'species = ' + trailspecies + '\n'
        trailJsName = '../trail-collection/js/' + code_name + '.js'
        trailHtmlName = '../trail-collection/' + code_name + '.html'
        trailjs = geoloc + specArray + trailStarter
        trailHtml += '<script src="' + 'js/' + code_name + '.js"></script>'
        trailHtml += '</div></body></html>'
        writeHtml(trailHtmlName, trailHtml)
        writeHtml(trailJsName,trailjs)
    else:
        print(tr[0])

by_trail_html = openHTML('../by_trail_starter.html')
front_country.sort()
city_beach.sort()
back_country.sort()

def regionHtml(regionList,regionName):
    outHtml = '<div class="group">'
    outHtml += '<h2>' + regionName + '</h2>'
    for r in regionList:
        code_name = r.lower()
        code_name = code_name.replace(' ','_')
        code_name = code_name.replace('\'','')
        code_name = code_name.replace('&','')
        link = '<a href="trail-collection/' + code_name + '.html">' + r + '</a>'
        outHtml += link
    outHtml += '</div>'
    return outHtml

by_trail_html += regionHtml(front_country,'Front Country')
by_trail_html += regionHtml(city_beach,'City & Beach')
by_trail_html += regionHtml(back_country,'Back Country')
by_trail_html += '</body></html>'

writeHtml('../by-trails.html', by_trail_html)
