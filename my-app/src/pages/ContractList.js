import React from 'react';
import ContractListReport from '../reports/ContractListReport';

function ContractList() {
  const handleButtonClick = () => {
    const reportWindow = window.open('', '_blank');
    reportWindow.document.write('<html><head><title>Contract List Report</title></head><body>');
    reportWindow.document.write('<div id="contract-list-report"></div>');
    reportWindow.document.write('</body></html>');
    reportWindow.document.close();

    setTimeout(() => {
      reportWindow.document.body.appendChild(reportWindow.document.createElement('script')).text = `
        const { createElement } = React;
        const { render } = ReactDOM;
        const ContractListReport = ${ContractListReport.toString()};
        render(createElement(ContractListReport), document.getElementById('contract-list-report'));
      `;
    }, 100);
  };

  return (
    <div>
      <h1>Contract List Report</h1>
      <p>Welcome to the Contract List page.</p>
      <button onClick={handleButtonClick}>
        View report
      </button>
    </div>
  );
}

export default ContractList;
