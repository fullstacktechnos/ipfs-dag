const { ipfs } = require("./ipfs");
const employee = require("./employee.json");

const runDagAPi = async () => {
  
  console.log('\nStore employee : ');
  let employeeCid = await ipfs.dag.put(employee, { 
    format: "dag-cbor", 
    hashAlg: "sha3-512" 
  })
  let empCidStr = employeeCid.toBaseEncodedString();
  console.log(empCidStr);

  console.log('\nGet employee : ');
  const empResult = await ipfs.dag.get(employeeCid);
  console.log(JSON.stringify(empResult.value));

  console.log('\nGet employee name : ');
  const empName = await ipfs.dag.get(employeeCid, 'name')
  const employeeName = empName.value;
  console.log(employeeName);

  console.log('\nGet employee address : ');
  const empAddress = await ipfs.dag.get(employeeCid, 'address')
  console.log(empAddress.value);

  console.log('\nGet employee 1st company : ');
  const empFirstCompany = await ipfs.dag.get(empCidStr + '/companies/0')
  console.log(empFirstCompany.value);

  // Attach employee to company
  let company = {
    name : "uol",
    address: "woodlandhills",
    employee: {}
  }
  company.employee[employeeName] = {
    "/": empCidStr
  }
  console.log("\n\nEmp details attached to company : ");
  console.log(JSON.stringify(company));

  console.log('\nStore Company : ');
  let companyCid = await ipfs.dag.put(company, { 
    format: "dag-cbor", 
    hashAlg: "sha3-512" 
  })
  let companyCidStr = companyCid.toBaseEncodedString();
  console.log(companyCidStr);

  console.log('\nGet Company : ');
  const companyResult = await ipfs.dag.get(companyCid);
  console.log(companyResult.value);

  console.log('\nGet the employee from company : ');
  const companyEmpResult = await ipfs.dag.get(companyCid, `employee/${employeeName}`);
  console.log(companyEmpResult.value);

}

runDagAPi();

  

