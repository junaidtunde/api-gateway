# Autochek Financing

---

## Description

Autochek Financing enables users get access to vehicle financing in Africa. Through our API, developers can access data like user information, loan information,
loan car inventory, offers and so on.

This is an application solely built to manage car financing, and functions solely with autochek inventory. All endpoints have the below as **base / parent url**:

**LIVE**

```live base url
https://api-prod.autochek.africa/v1
```

**SANDBOX**

```staging base url
https://api.staging.myautochek.com/v1
```

> [!NOTE]
> All other endpoints should be appended to the end of this base url. Also all payloads should be formatted in _JSON_.

## Authentication

This resource gives authorization to access other resources below. A JWT Token is issued, and cached. This can then further serve as an authentication to access other resources.

> [!TIP|label:POST|iconVisibility:hidden] `/auth/login`

```payload
"email": "string",
"password": "******"
```

**Response**

```response
"user": {
    "roles": [],
    "id": "string",
    "firstname": "string",
    "lastname": "string",
    "email": "string",
    "createdBy": "string",
    "country": "string",
    "active": boolean,
    "createdAt": "Wed Nov 25 2020 21:23:55 GMT+0000 (Coordinated Universal Time)",
    "updatedAt": "Fri Dec 04 2020 11:47:21 GMT+0000 (Coordinated Universal Time)"
},
"authority": {
    "roles": [],
    "permissions": []
},
"token": "string"
```

## Password Reset

This resource enables users change their passwords.

> [!TIP|label:PUT|iconVisibility:hidden] `/auth/update-password`

```payload
"id": "string",
"password": "******"
```

**Response**

```response
"roles": [],
"id": "string",
"firstname": "string",
"lastname": "string",
"email": "string",
"createdBy": "string",
"country": "string",
"active": boolean,
"createdAt": "Wed Nov 25 2020 21:23:55 GMT+0000 (Coordinated Universal Time)",
"updatedAt": "Fri Dec 04 2020 11:47:21 GMT+0000 (Coordinated Universal Time)"
```

## Fetch Financing Vehicles

This resource returns the vehicles that correspond to the calculated customer's maximum car price that can be applied for. **high_price** should be the **applicableLoan** amount returned previously. Reponse is an array of vehicles.

> [!TIP|label:GET|iconVisibility:hidden] `/inventory/car?has_fincancing=true&country=NG&high_price=0`

**Response**

```response
"carList": [
    {
        "features": [],
        "carFeatures": [],
        "modelFeatures": [],
        "delistReason": [],
        "id": "Wsuh5EnCbg",
        "year": 2019,
        "insured": false,
        "mileage": 40643,
        "vin": "3Y3QU99JG5DC11276",
        "licensePlate": "OWW 656 EC",
        "engineNumber": "GYOECDTF4O",
        "price": 0,
        "createdBy": "aG-lh0ohiq",
        "marketplacePrice": 0,
        "marketplaceVisible": true,
        "marketplaceVisibleDate": "Wed Oct 28 2020 19:05:17 GMT+0100 (West Africa Standard Time)",
        "isFeatured": true,
        "reasonForSelling": "Recusandae vel aut qui quia assumenda. Eligendi rerum quas. Delectus ratione commodi ut pariatur et repellendus. Quae sint ea delectus iste at sequi. Et tempore excepturi et voluptatem dicta sit nobis rerum numquam.",
        "imageUrl": "https://images.unsplash.com/photo-1599834913612-e1afcef37547?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE2Njk2Nn0",
        "ownerId": "blpfdpjDOR",
        "model": {
            "modelFeatures": [],
            "id": 1411,
            "name": "Cooper SD Paceman",
            "imageUrl": "",
            "wheelType": "2WD",
            "series": "Paceman Series",
            "make": {
                "id": 73,
                "name": "MINI",
                "imageUrl": ""
            },
            "popular": false
        },
        "state": "Port Harcout",
        "country": "NG",
        "address": "6118 Lessie Ranch",
        "carManagerId": "3VeTn01JOG",
        "ownerType": "individual",
        "transmission": "duplex",
        "fuelType": "hybrid",
        "sellingCondition": "local",
        "city": "Port Harcout",
        "marketplaceOldPrice": 0,
        "createdAt": "Wed Oct 28 2020 19:05:17 GMT+0100 (West Africa Standard Time)",
        "updatedAt": "Wed Oct 28 2020 19:05:17 GMT+0100 (West Africa Standard Time)",
        "mileageUnit": "km",
        "hasWarranty": true,
        "hasFinancing": false,
        "interiorColor": "purple",
        "exteriorColor": "magenta",
        "engineType": "4-cylinder(I4)",
        "gradeScore": 3.5,
        "installment": 0,
        "depositReceived": false,
        "isFirstOwner": false,
        "loanValue": 0
    }
]
```

## Fetch Finance Vehicle Detail By ID

This resource returns information on a finance vehicle and all cost breakdowns, that results in the loan amount for the vehicle.

> [!TIP|label:GET|iconVisibility:hidden] `/loan/car/{id}`

**Response**

```response
"features": [],
"carFeatures": [],
"modelFeatures": [],
"id": "AdLtLW7gQr7",
"year": 2006,
"insured": false,
"mileage": 251916,
"vin": "ZEQIXN7N2OPE33389",
"licensePlate": "ZTA 143 LM",
"engineNumber": "QM8C1P9TLF",
"price": 159963,
"createdBy": "aG-lh0ohiq",
"marketplacePrice": 198958,
"marketplaceVisible": true,
"marketplaceVisibleDate": "Wed Oct 28 2020 18:54:33 GMT+0100 (West Africa Standard Time)",
"isFeatured": true,
"reasonForSelling": "Saepe illum eum. Velit quo quis dolorem sint. Laborum vel voluptate. Suscipit rerum neque sint cupiditate ut et consectetur. Sapiente maiores et odio aperiam molestiae aperiam.",
"imageUrl": "https://images.unsplash.com/photo-1581230546222-7faf7c4609a0?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE2Njk2Nn0",
"ownerId": "u4BfBKrzNaF",
"model": {
    "modelFeatures": [],
    "id": 1888,
    "name": "Carina",
    "imageUrl": "",
    "wheelType": "2WD",
    "make": {
        "id": 106,
        "name": "Toyota",
        "imageUrl": ""
    },
    "popular": false
},
"state": "Kisumu",
"country": "NG",
"address": "589 Ankunding Throughway",
"carManagerId": "kp-G23CKEx-",
"ownerType": "individual",
"transmission": "duplex",
"fuelType": "petrol",
"category": {
    "id": 2,
    "name": "Games-18986"
},
"sellingCondition": "import",
"bodyType": {
    "id": 7,
    "name": "Coupe",
    "imageUrl": "https://storage.googleapis.com/img.autochek.africa/svg/Coupe.svg"
},
"city": "Kisumu",
"marketplaceOldPrice": 0,
"createdAt": "Wed Oct 28 2020 18:54:33 GMT+0100 (West Africa Standard Time)",
"updatedAt": "Wed Oct 28 2020 18:54:34 GMT+0100 (West Africa Standard Time)",
"mileageUnit": "km",
"hasWarranty": false,
"hasFinancing": true,
"interiorColor": "salmon",
"exteriorColor": "lime",
"engineType": "4-cylinder(I4)",
"gradeScore": 2.9000000953674316,
"installment": 24538.150390625,
"depositReceived": false,
"isFirstOwner": false,
"loanPrice": 490195,
"insurance": 7959,
"vehicleRegistration": 60000,
"maintenance": 155000,
"trackingFee": 40000,
"serviceCharge": 7959,
"vat": 20319,
"downPayment": 147058.5
```

## Collect Customer Basic Information

This resource enables users upload their basic information.

> [!TIP|label:POST|iconVisibility:hidden] `/loan/loan_user/create`

```payload
"userId": "string",
"basicInfo": {
    "title": "Mr.",
    "firstName": "string",
    "lastName": "string",
    "email": "string.string@string.com",
    "phone": "08134534***",
    "bvn": number,
    "dob": "1907-03-03",
    "income": 40000,
    "downPayment": 2200,
    "tenure": "1 Year"
}
```

**Response**

```response
"applicableLoan": 100000,
"canApplyForSubmittedCar": false
```

## Collect Customer Personal Information

This resource enables users upload their personal information.

> [!TIP|label:POST|iconVisibility:hidden] `/loan/personal-information`

```payload
"userId": "fGY_AmRlB",
"carId": "ut4FBHxBty",
"personalInfo": {
    "gender": "MALE",
    "meansOfIdentification": "International Passport",
    "idNumber": 55446677,
    "maritalStatus": "Single",
    "numberOfDependents": 4,
    "educationLevel": "Tertiary",
    "identificationImage": "https://storage.googleapis.com/autochek-staging/upload.jpg",
    "utilityBill": "https://storage.googleapis.com/autochek-staging/upload.pdf"
},
"addressInfo": {
    "residentialStatus": "Rented",
    "flatNumber": 18,
    "street": "Customer",
    "busStop": "User, Purchase",
    "lga": "Eshett",
    "state": "Lagos",
    "residenceDuration": "3 years",
    "rentAmount": 400000
},
"nextOfKin": {
    "fullname": "Customer User",
    "relationship": "Brother",
    "phone": "+2338029330466",
    "email": "customer.string@string.com"
}
```

## Collect Customer Salary Earner's Information

This resource enables users who are salary earners to fill required information.

> [!TIP|label:POST|iconVisibility:hidden] `/loan/salary_earner`

```payload
"userId": "fGY_AmRlB",
"nameOfEmployer": "Boss",
"officeAddress": {
    "plotNumber": 3,
    "street": "Sylvia Crescent",
    "busStop": "Anthony Way",
    "state": "Lagos",
    "lga": "Anthony Village"
},
"officePhone": "08185826753",
"officeEmail": "autochek.africa.ng",
"businessIndustry": "Information & Communication Technology",
"businessSector": "Tech",
"employmentDate": "date (format: YYYY-MM-DD)",
"dateOfConfirmationOrPromotion": "date (format: YYYY-MM-DD)",
"monthlyNetSalary": 250000,
"dayOfSalaryPayment": 26,
"colleagueFirstName": "Customer",
"colleagueLastName": "User",
"colleaguePhone": "0903525****",
"colleagueEmail": "customer@customer.com",
"employmentOrConfirmationLetter": "https://storage.googleapis.com/autochek-staging/upload.pdf",
"officeIdentification": "https://storage.googleapis.com/autochek-staging/upload.pptx"
```

## Collect Customer Business Client's Information

This resource enables users who are business clients, upload required information.

> [!TIP|label:POST|iconVisibility:hidden] `/loan/business_client`

```payload
"userId": "fGY_AmRlB",
"companyName": "Autochek",
"businessType": "Auto financing",
"registrationType": "Government",
"registrationNumber": 123456,
"positionInCompany": "CEO",
"numberOfYearsInCompany": 6,
"numberOfEmployees": "600",
"numberOfOutlets": "100",
"businessAddress": {
    "buildingNumber": 22,
    "street": "Sylvia Crescent",
    "busStop": "GTBank Drive Through",
    "lga": "Anthony",
    "state": "Lagos",
    "residenceDuration": "3 years"
},
"cacCertificateDocument": "https://storage.googleapis.com/autochek-staging/upload.pptx",
"bn1OrCac7Document": "https://storage.googleapis.com/autochek-staging/upload.pptx",
"utilityBill": "https://storage.googleapis.com/autochek-staging/upload.pptx",
"taxIdentificationNumber": 11222333445666,
"businessSector": "Agriculture",
"businessIndustry": "Fish Farming"
```

## Fetch All Customers

This resource returns all customers. The progress key on the response represents the user's progress through our registration process.

> [!TIP|label:GET|iconVisibility:hidden] `/loan/loan_user`

**Response**

```response
"allLoanUsers": [
    {
        "loans": [
            {
                "offers": [],
                "creditAgreement": [],
                "id": "G1O3ZW3q1",
                "requestId": 930796485,
                "loanAmount": 340685,
                "carId": "D7XIDIEugIV",
                "carName": "Ferrari 550 - 2018",
                "isDepositPaid": false,
                "status": "DRAFT",
                "createdAt": "Tue Dec 08 2020 10:55:59 GMT+0100 (West Africa Standard Time)"
            }
        ],
        "id": "yXB-Vdeuk",
        "uuid": "fGY_AmRlB",
        "title": "Mr.",
        "firstName": "User",
        "lastName": "Customer",
        "email": "user.cusotmer@gmail.com",
        "phone": "08188888888",
        "dob": "1987-01-26",
        "BVN": "2222222222",
        "income": "400000",
        "isEmployee": true,
        "okraCustomerId": "0",
        "okraRecordId": "0",
        "okraBankId": "0",
        "downPayment": 220000,
        "tenure": "1 Year",
        "progress": "Salary Earner",
        "createdAt": "Mon Dec 07 2020 07:31:17 GMT+0100 (West Africa Standard Time)",
        "personalInfo": {
            "id": "eHJDcJJ9T",
            "gender": "MALE",
            "meansOfIdentification": "International Passport",
            "maritalStatus": "Single",
            "numberOfDependents": 4,
            "educationLevel": "Tertiary",
            "identificationImage": "https://storage.googleapis.com/autochek-staging/4bebd6cd-0323-4861-9c65-49b6c6d4f348-alexander-krivitskiy-awXBjFhh7iw-unsplash.jpg",
            "residentialStatus": "Rented",
            "flatNumber": 18,
            "street": "street",
            "busStop": "string",
            "LGA": "string",
            "state": "Lagos",
            "residenceDuration": "3 years",
            "rentAmount": 400000,
            "utilityBill": "https://storage.googleapis.com/autochek-staging/158d1b65-a4e0-4439-a45d-8f29ea31f530-my_resume%20(2).pdf",
            "nextOfKinFullname": "string",
            "nextOfKinRelationship": "Brother",
            "nextOfKinPhone": "08088888888",
            "nextOfKinEmail": "string",
            "createdAt": "Tue Dec 08 2020 10:55:59 GMT+0100 (West Africa Standard Time)"
        },
        "salaryEarner": {
            "id": "SHLPYaYj5",
            "nameOfEmployer": "Boss",
            "plotNumber": "3",
            "street": "Sylvia Crescent",
            "busStop": "Anthony Way",
            "state": "Lagos",
            "lga": "Anthony Village",
            "officePhone": "08188888888",
            "officeEmail": "autochek.africa.ng",
            "employmentDate": "2020-12-08",
            "dateOfConfirmationOrPromotion": "2020-12-08",
            "monthlyNetSalary": 250000,
            "dayOfSalaryPayment": 26,
            "colleagueFirstName": "string",
            "colleagueLastName": "string",
            "colleaguePhone": "09088888888",
            "colleagueEmail": "string",
            "employmentOrConfirmationLetter": "https://storage.googleapis.com/autochek-staging/158d1b65-a4e0-4439-a45d-8f29ea31f530-my_resume%20.jpg",
            "officeIdentification": "https://storage.googleapis.com/autochek-staging/19ed2021-1e6a-43eb-b471-be528fb36f3e-loan.jpg",
            "businessSector": "Fishing",
            "businessIndustry": "Agriculture",
            "createdAt": "Tue Dec 08 2020 11:08:42 GMT+0100 (West Africa Standard Time)"
        },
        "isBankStatementCollected": true,
        "hasPaidForFirstLoan": true,
        "bankStatementSource": "OKRA"
        "applicableLoan": 15000000
    }
]
```

## Fetch Customer By UUID

This resource returns a customer's details, including his loans and offers received.

> [!TIP|label:GET|iconVisibility:hidden] `/loan/loan_user/{uuid}`

**Response**

```response
{
    "loans": [
        {
            "offers": [],
            "creditAgreement": [],
            "id": "G1O3ZW3q1",
            "requestId": 930796485,
            "loanAmount": 340685,
            "carId": "D7XIDIEugIV",
            "carName": "Ferrari 550 - 2018",
            "isDepositPaid": false,
            "status": "DRAFT",
            "createdAt": "Tue Dec 08 2020 10:55:59 GMT+0100 (West Africa Standard Time)"
        }
    ],
    "id": "yXB-Vdeuk",
    "uuid": "fGY_AmRlB",
    "title": "Mr.",
    "firstName": "User",
    "lastName": "Customer",
    "email": "user.cusotmer@gmail.com",
    "phone": "08188888888",
    "dob": "1987-01-26",
    "BVN": "2222222222",
    "income": "400000",
    "isEmployee": true,
    "okraCustomerId": "0",
    "okraRecordId": "0",
    "okraBankId": "0",
    "downPayment": 220000,
    "tenure": "1 Year",
    "progress": "Salary Earner",
    "createdAt": "Mon Dec 07 2020 07:31:17 GMT+0100 (West Africa Standard Time)",
    "personalInfo": {
        "id": "eHJDcJJ9T",
        "gender": "MALE",
        "meansOfIdentification": "International Passport",
        "maritalStatus": "Single",
        "numberOfDependents": 4,
        "educationLevel": "Tertiary",
        "identificationImage": "https://storage.googleapis.com/autochek-staging/4bebd6cd-0323-4861-9c65-49b6c6d4f348-alexander-krivitskiy-awXBjFhh7iw-unsplash.jpg",
        "residentialStatus": "Rented",
        "flatNumber": 18,
        "street": "street",
        "busStop": "string",
        "LGA": "string",
        "state": "Lagos",
        "residenceDuration": "3 years",
        "rentAmount": 400000,
        "utilityBill": "https://storage.googleapis.com/autochek-staging/158d1b65-a4e0-4439-a45d-8f29ea31f530-my_resume%20(2).pdf",
        "nextOfKinFullname": "string",
        "nextOfKinRelationship": "Brother",
        "nextOfKinPhone": "08088888888",
        "nextOfKinEmail": "string",
        "createdAt": "Tue Dec 08 2020 10:55:59 GMT+0100 (West Africa Standard Time)"
    },
    "salaryEarner": {
        "id": "SHLPYaYj5",
        "nameOfEmployer": "Boss",
        "plotNumber": "3",
        "street": "Sylvia Crescent",
        "busStop": "Anthony Way",
        "state": "Lagos",
        "lga": "Anthony Village",
        "officePhone": "08188888888",
        "officeEmail": "autochek.africa.ng",
        "employmentDate": "2020-12-08",
        "dateOfConfirmationOrPromotion": "2020-12-08",
        "monthlyNetSalary": 250000,
        "dayOfSalaryPayment": 26,
        "colleagueFirstName": "string",
        "colleagueLastName": "string",
        "colleaguePhone": "09088888888",
        "colleagueEmail": "string",
        "employmentOrConfirmationLetter": "https://storage.googleapis.com/autochek-staging/158d1b65-a4e0-4439-a45d-8f29ea31f530-my_resume%20.jpg",
        "officeIdentification": "https://storage.googleapis.com/autochek-staging/19ed2021-1e6a-43eb-b471-be528fb36f3e-loan.jpg",
        "businessSector": "Fishing",
        "businessIndustry": "Agriculture",
        "createdAt": "Tue Dec 08 2020 11:08:42 GMT+0100 (West Africa Standard Time)"
    },
    "isBankStatementCollected": true,
    "hasPaidForFirstLoan": true,
    "applicableLoan": 15000000
}
```

## Make Payment For Loan Vehicle

This resource enables users pay a deposit for the vehicle they applied for.

> [!TIP|label:POST|iconVisibility:hidden] `/loan/make_deposit`

```payload
"userId": "fGY_AmRlB",
"carId": "D7XIDIEugIV",
"depositedAmount": 23000.50,
"paymentReference": "PLXRE%679wRTD30056860"
```

## Upload Bank Statement

This resource enables users upload their bank statements.

> [!TIP|label:POST|iconVisibility:hidden] `/loan/bank_statement`

```payload
{
  "user_id": "string",
  "bank_statement_link": "string",
  "bank_statement_bank": "string",
  "bank_statement_verification": true
}
```

## Fetch All Loans

This resource returns all the loans and also in addition, the offers and the customer's information.

> [!TIP|label:GET|iconVisibility:hidden] `/loan`

**Response**

```response
"allLoans": [
    {
        "offers": [],
        "creditAgreement": [],
        "id": "G1O3ZW3q1",
        "requestId": 930796485,
        "loanAmount": 340685,
        "carId": "D7XIDIEugIV",
        "carName": "Ferrari 550 - 2018",
        "isDepositPaid": false,
        "status": "DRAFT",
        "createdAt": "Tue Dec 08 2020 10:55:59 GMT+0100 (West Africa Standard Time)",
        "user": {
            "id": "yXB-Vdeuk",
            "uuid": "fGY_AmRlB",
            "title": "Mr.",
            "firstName": "User",
            "lastName": "Customer",
            "email": "user.cusotmer@gmail.com",
            "phone": "08188888888",
            "dob": "1987-01-26",
            "BVN": "2222222222",
            "income": "400000",
            "isEmployee": true,
            "okraCustomerId": "0",
            "okraRecordId": "0",
            "okraBankId": "0",
            "downPayment": 220000,
            "tenure": "1 Year",
            "progress": "Salary Earner",
            "createdAt": "Mon Dec 07 2020 07:31:17 GMT+0100 (West Africa Standard Time)",
            "personalInfo": {
                "id": "eHJDcJJ9T",
                "gender": "MALE",
                "meansOfIdentification": "International Passport",
                "maritalStatus": "Single",
                "numberOfDependents": 4,
                "educationLevel": "Tertiary",
                "identificationImage": "https://storage.googleapis.com/autochek-staging/4bebd6cd-0323-4861-9c65-49b6c6d4f348-alexander-krivitskiy-awXBjFhh7iw-unsplash.jpg",
                "residentialStatus": "Rented",
                "flatNumber": 18,
                "street": "street",
                "busStop": "string",
                "LGA": "string",
                "state": "Lagos",
                "residenceDuration": "3 years",
                "rentAmount": 400000,
                "utilityBill": "https://storage.googleapis.com/autochek-staging/158d1b65-a4e0-4439-a45d-8f29ea31f530-my_resume%20(2).pdf",
                "nextOfKinFullname": "string",
                "nextOfKinRelationship": "Brother",
                "nextOfKinPhone": "08088888888",
                "nextOfKinEmail": "string",
                "createdAt": "Tue Dec 08 2020 10:55:59 GMT+0100 (West Africa Standard Time)"
            },
            "salaryEarner": {
                "id": "SHLPYaYj5",
                "nameOfEmployer": "Boss",
                "plotNumber": "3",
                "street": "Sylvia Crescent",
                "busStop": "Anthony Way",
                "state": "Lagos",
                "lga": "Anthony Village",
                "officePhone": "08188888888",
                "officeEmail": "autochek.africa.ng",
                "employmentDate": "2020-12-08",
                "dateOfConfirmationOrPromotion": "2020-12-08",
                "monthlyNetSalary": 250000,
                "dayOfSalaryPayment": 26,
                "colleagueFirstName": "string",
                "colleagueLastName": "string",
                "colleaguePhone": "09088888888",
                "colleagueEmail": "string",
                "employmentOrConfirmationLetter": "https://storage.googleapis.com/autochek-staging/158d1b65-a4e0-4439-a45d-8f29ea31f530-my_resume%20.jpg",
                "officeIdentification": "https://storage.googleapis.com/autochek-staging/19ed2021-1e6a-43eb-b471-be528fb36f3e-loan.jpg",
                "businessSector": "Fishing",
                "businessIndustry": "Agriculture",
                "createdAt": "Tue Dec 08 2020 11:08:42 GMT+0100 (West Africa Standard Time)"
            },
            "isBankStatementCollected": true,
            "hasPaidForFirstLoan": true,
            "applicableLoan": 15000000
        }
    },
]
```

## Fetch Loan By ID

This resource returns all the loans and also in addition, the offers and the customer's information.

> [!TIP|label:GET|iconVisibility:hidden] `/loan/{id}`

**Response**

```response
"offers": [],
"creditAgreement": [],
"id": "G1O3ZW3q1",
"requestId": 930796485,
"loanAmount": 340685,
"carId": "D7XIDIEugIV",
"carName": "Ferrari 550 - 2018",
"isDepositPaid": false,
"status": "DRAFT",
"createdAt": "Tue Dec 08 2020 10:55:59 GMT+0100 (West Africa Standard Time)",
"user": {
    "id": "yXB-Vdeuk",
    "uuid": "fGY_AmRlB",
    "title": "Mr.",
    "firstName": "User",
    "lastName": "Customer",
    "email": "user.cusotmer@gmail.com",
    "phone": "08188888888",
    "dob": "1987-01-26",
    "BVN": "2222222222",
    "income": "400000",
    "isEmployee": true,
    "okraCustomerId": "0",
    "okraRecordId": "0",
    "okraBankId": "0",
    "downPayment": 220000,
    "tenure": "1 Year",
    "progress": "Salary Earner",
    "createdAt": "Mon Dec 07 2020 07:31:17 GMT+0100 (West Africa Standard Time)",
    "personalInfo": {
        "id": "eHJDcJJ9T",
        "gender": "MALE",
        "meansOfIdentification": "International Passport",
        "maritalStatus": "Single",
        "numberOfDependents": 4,
        "educationLevel": "Tertiary",
        "identificationImage": "https://storage.googleapis.com/autochek-staging/4bebd6cd-0323-4861-9c65-49b6c6d4f348-alexander-krivitskiy-awXBjFhh7iw-unsplash.jpg",
        "residentialStatus": "Rented",
        "flatNumber": 18,
        "street": "street",
        "busStop": "string",
        "LGA": "string",
        "state": "Lagos",
        "residenceDuration": "3 years",
        "rentAmount": 400000,
        "utilityBill": "https://storage.googleapis.com/autochek-staging/158d1b65-a4e0-4439-a45d-8f29ea31f530-my_resume%20(2).pdf",
        "nextOfKinFullname": "string",
        "nextOfKinRelationship": "Brother",
        "nextOfKinPhone": "08088888888",
        "nextOfKinEmail": "string",
        "createdAt": "Tue Dec 08 2020 10:55:59 GMT+0100 (West Africa Standard Time)"
    },
    "salaryEarner": {
        "id": "SHLPYaYj5",
        "nameOfEmployer": "Boss",
        "plotNumber": "3",
        "street": "Sylvia Crescent",
        "busStop": "Anthony Way",
        "state": "Lagos",
        "lga": "Anthony Village",
        "officePhone": "08188888888",
        "officeEmail": "autochek.africa.ng",
        "employmentDate": "2020-12-08",
        "dateOfConfirmationOrPromotion": "2020-12-08",
        "monthlyNetSalary": 250000,
        "dayOfSalaryPayment": 26,
        "colleagueFirstName": "string",
        "colleagueLastName": "string",
        "colleaguePhone": "09088888888",
        "colleagueEmail": "string",
        "employmentOrConfirmationLetter": "https://storage.googleapis.com/autochek-staging/158d1b65-a4e0-4439-a45d-8f29ea31f530-my_resume%20.jpg",
        "officeIdentification": "https://storage.googleapis.com/autochek-staging/19ed2021-1e6a-43eb-b471-be528fb36f3e-loan.jpg",
        "businessSector": "Fishing",
        "businessIndustry": "Agriculture",
        "createdAt": "Tue Dec 08 2020 11:08:42 GMT+0100 (West Africa Standard Time)"
    },
    "isBankStatementCollected": true,
    "hasPaidForFirstLoan": true,
    "applicableLoan": 15000000
}
```

## Give Customer Offer

This resource allows for financiers give offers to a customer based on the loan submitted.

> [!TIP|label:POST|iconVisibility:hidden] `/loan/make_offer`

```payload
"loanId": "5_T58ERGkC",
"approverId": "CMrYYvpcV",
"approvedAmount": 90000,
"durationOrTenure": "10 months",
"interestPerAnnum": 3.3,
"bankName": "Autochek"
```

## Reject Customer's Loan Request

This resource allows for financiers reject a loan applied by a customer.

> [!TIP|label:POST|iconVisibility:hidden] `/loan/decline_loan`

```payload
"loanId": "5_T58ERGkC",
"approverId": "CMrYYvpcV",
"bankName": "Autochek",
"reasonForDeclination": "string"
```

## Customer Accepts Offer

This resource allows for users, to accept loan offers from banks

> [!TIP|label:POST|iconVisibility:hidden] `/loan/accept_offer`

```payload
"offerId": "rpIqk4zf2",
"userId": "fGY_AmRlB"
```

## Customer Declines Offer

This resource allows for users, to reject / decline loan offers from banks

> [!TIP|label:POST|iconVisibility:hidden] `/loan/accept_offer`

```payload
"offerId": "rpIqk4zf2",
"reasonForDeclination": "Opt Out"
```
