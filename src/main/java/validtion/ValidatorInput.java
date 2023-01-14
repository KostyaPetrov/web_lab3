package validtion;

import beans.DataBean;

public class ValidatorInput {

    public ValidatorInput() {

    }

    private boolean validateX(double x) {
        return !(x < -4) && !(x > 4);
    }

    private boolean validateY(double y) {
        return !(y < -3) && !(y > 5);
    }

    private boolean validateR(double r) {
        return !(r < 1) && !(r > 3);
    }

    public boolean validateInput(DataBean dataBean) {
        return validateX(dataBean.getCoordinateX()) && validateY(dataBean.getCoordinateY()) && validateR(dataBean.getRadius());
    }
}
