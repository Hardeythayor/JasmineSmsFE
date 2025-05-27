import React from "react";

const CreditHistoryTable = ({creditHistory}) => {
  return (
    <div className="table-responsive">
      <table className="table table-hover table-lg table-bordered-outer p-1">
        <thead>
          <tr>
            <th className="paragraph">Date</th>
            <th className="paragraph">Division</th>
            <th className="paragraph">Amount</th>
            <th className="paragraph">Detail</th>
          </tr>
        </thead>
        <tbody>
            {creditHistory.length == 0 ?
                <tr>
                    <td colSpan="4">
                        <div className="text-center">No record found</div>
                    </td>
                </tr>

            :
                creditHistory.map(history => (
                    <tr key={history.id}>
                        <td className="paragraph2 py-3 ">{history.created_at}</td>
                        <td className="paragraph2 py-3 ">
                        <span className={`badge badge-special rounded-pill 
                                ${history.type == 'charge' ? 'bg-success-light' : 'bg-danger text-white'} text-capitalize`
                        }>
                            {history.type}
                        </span>
                        </td>
                        <td className="paragraph2 py-3">
                            <div className={`amount-container ${history.type == 'charge' ? 'text-success' : 'text-danger'} paragraph2`}>
                                {history.type == 'charge' ? '+' : '-'}{Number(history.amount).toLocaleString()}
                                <div className="mobile-date paragraph2">{history.created_at}</div>
                            </div>
                        </td>
                        <td className="paragraph2 py-3">{history.purpose}</td>
                    </tr>
                ))
            }
        </tbody>
      </table>
    </div>
  );
};

export default CreditHistoryTable;
