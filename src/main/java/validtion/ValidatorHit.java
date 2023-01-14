package validtion;

import beans.DataBean;

public class ValidatorHit {

    private double x;
    private double y;
    private double r;


    public ValidatorHit() {
    }

    private boolean checkFirstQuarter(){
        return x >= 0 && y >= 0 && y<=-x+0.5;
    }

    private boolean checkSecondQuarter(){
        return x<=0 && y>=0 && (x*x)+(y*y)<=(r/2)*(r/2);
    }

    private boolean checkThirdQuarter(){
        return x<=0 && y<=0 && x<=r && y<=r;
    }

    public boolean validateHit(DataBean dataBean) {
        this.x=dataBean.getCoordinateX();
        this.y=dataBean.getCoordinateY();
        this.r=dataBean.getRadius();
        return checkFirstQuarter() || checkSecondQuarter() || checkThirdQuarter();
    }
}
