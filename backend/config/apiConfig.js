module.exports = {
    soapApis: [
        {
            name: 'Calculator',
            url: 'http://www.dneonline.com/calculator.asmx?wsdl', // WSDL URL
            method: 'Add', // SOAP method to call
            data: { intA: 5, intB: 8 } // Named parameters for the method
          }
        // ... more SOAP APIs
    ],
    restApis: [
        {
            name: "Employees",
            url: 'https://dummy.restapiexample.com/api/v1/employee/1',
            method: 'GET',
            headers: { /* REST request headers */ }
        }, {
            name: "Electronics",
            url: 'https://api.restful-api.dev/objects/7',
            method: 'GET',
            headers: { /* REST request headers */ }
        },
        // ... more REST APIs
    ]
};