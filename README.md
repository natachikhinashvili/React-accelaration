# React accelaration task

## website look

![website](./website.png)

## commands for running app
1. git clone https://github.com/natachikhinashvili/React-accelaration.git
2. cd country-app
3. npm init
4. npm install
5. npm start

## Tasks 
- [x] 1. ქვეყნის არჩევა: პირველივე გვერდზე მომხმარებელს უნდა დახვდეს ყველა შესაძლო ქვეყნის სია (countries API) და მათგან ერთ ერთის არჩევის შესაძლებლობა.
- [x] 2. ქვეყნის ავტომატურად არჩევა: აპლიკაციას უნდა შეეძლოს ქვეყნის ავტომატურად არჩევა თქვენი ადგილმდებარეობიდან გამომდინარე. პირველ რიგში აპლიკაციამ მომხმარებელს უნდა მოსთხოვოს ადგილმდებარეობაზე წვდომის უფლება (latitude and longitude). დასტურის შემთხვევაში გრძედი და განედის მიხედვით დაადგინეთ ქვეყანა (google geocoding  API)
- [x] 3. ქვეყნის არჩევის შემდეგ აპლიკაციაში უნდა გამოჩნდეს შემდეგი 2 გვერდი: "Currency Exchange" და "Airports".
    - Currency Exchange: მომხმარებელს უნდა შეეძლოს დანიშნულების ქვეყნის (ქვეყანა, რომლის ვალუტაშიც უნდა გადავიყვანოთ თანხა) არჩევა და თანხის შეყვანა, რის შემდეგაც სისტემამ უნდა დააკონვერტიროს თანხა შესაბამისი ქვეყნის ვალუტაში. (currency API)
    - Airports: შესაბამის გვერდზე გადასვლისას მომხმარებელმა უნდა დაინახოს არჩეულ ქვეყანაში არსებული აეროპორტები. ასევე, ამ გვერდზე უნდა იყოს ძებნის ველი. API მოთხოვნები უნდა გაიგზავნოს ველში ინფორმაციის შეყვანისას, თუმცა გაითვალისწინეთ, რომ API მოთხოვნა გააგზავნოთ მხოლოდ მაშინ, თუ ბოლო სიმბოლოს შეყვანის შემდეგ გავიდა 500 მილიწამი. 

## APIs
1. Google geocoding API - https://developers.google.com/maps/documentation/geocoding/requests-reverse-geocoding
2. Countries API: https://restcountries.com/
3. Currency API - https://exchangerate.host/
4. Airports API - https://api-ninjas.com/api/airports