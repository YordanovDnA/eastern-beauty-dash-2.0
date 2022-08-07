import React from "react";
import CustomChart from "../components/common/chart";
import MainLayout from '../layout/MainLayout';

const Dashboard = () => {
  return (
    <MainLayout>
      <div className="container-fluid">
        <h1 className="mt-4">Dashboard</h1>
        <div className="row">
          <div className="col-xl-3 col-md-6">
            <div className="card bg-primary text-white mb-4">
              <div className="card-body">Live users</div>
              <div className="card-body display-3 text-center">250</div>
              <div className="card-footer d-flex align-items-center justify-content-between">
                <a className="small text-white stretched-link" href="#">
                  View Details
                </a>
                <div className="small text-white">
                  <i className="fas fa-angle-right"></i>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-md-6">
            <div className="card bg-warning text-white mb-4">
              <div className="card-body">At checkout</div>
              <div className="card-body display-3 text-center">98</div>
              <div className="card-footer d-flex align-items-center justify-content-between">
                <a className="small text-white stretched-link" href="#">
                  View Details
                </a>
                <div className="small text-white">
                  <i className="fas fa-angle-right"></i>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-md-6">
            <div className="card bg-success text-white mb-4">
              <div className="card-body">Successful orders</div>
              <div className="card-body display-3 text-center">82</div>
              <div className="card-footer d-flex align-items-center justify-content-between">
                <a className="small text-white stretched-link" href="#">
                  View Details
                </a>
                <div className="small text-white">
                  <i className="fas fa-angle-right"></i>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-md-6">
            <div className="card bg-danger text-white mb-4">
              <div className="card-body">Drop off on checkout</div>
              <div className="card-body display-3 text-center">30</div>
              <div className="card-footer d-flex align-items-center justify-content-between">
                <a className="small text-white stretched-link" href="#">
                  View Details
                </a>
                <div className="small text-white">
                  <i className="fas fa-angle-right"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xl-6">
            <CustomChart
              title="Visitors"
              type="line"
              labels={[
                "Mar 1",
                "Mar 2",
                "Mar 3",
                "Mar 4",
                "Mar 5",
                "Mar 6",
                "Mar 7",
              ]}
              data={[1020, 988, 3100, 2400, 2200, 1000, 850]}
              controls={true}
            />
          </div>
          <div className="col-xl-6">
            <CustomChart
              title="Live sessions"
              type="bar"
              labels={[
                "Mar 1",
                "Mar 2",
                "Mar 3",
                "Mar 4",
                "Mar 5",
                "Mar 6",
                "Mar 7",
              ]}
              data={[1020, 988, 3100, 2400, 2200, 1000, 850]}
              controls={false}
            />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
