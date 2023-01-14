package beans;



import javax.persistence.*;
import java.io.Serializable;


@Entity
@Table(name = "DataBean")
public class DataBean implements Serializable {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;


    @Column(name = "coordinateX")
    private Double coordinateX;
    @Column(name = "coordinateY")
    private Double coordinateY;
    @Column(name = "Radius")
    private Double radius;
    @Column(name = "hitResult")
    private Boolean hitResult;





    public DataBean() {

    }

    public Double getCoordinateX() {
        return coordinateX;
    }

    public void setCoordinateX(Double coordinateX) {
        this.coordinateX = Math.round(coordinateX*1000.0)/1000.0;
    }

    public Double getCoordinateY() {
        return coordinateY;
    }

    public void setCoordinateY(Double coordinateY) {
        this.coordinateY =Math.round(coordinateY*1000.0)/1000.0;
    }

    public Double getRadius() {
        return radius;
    }

    public void setRadius(Double radius) {
        this.radius =Math.round(radius*1000.0)/1000.0;
    }

    public Boolean getHitResult() {
        return hitResult;
    }

    public void setHitResult(Boolean hitResult) {
        this.hitResult = hitResult;
    }

    @Override
    public String toString() {
        return "DataBean{" +
                "coordinateX=" + coordinateX +
                ", coordinateY=" + coordinateY +
                ", radius=" + radius +
                ", hitResult=" + hitResult +
                '}';
    }

    @Override
    public boolean equals(Object o) {


        if (this == o) return true;
        if (o instanceof DataBean) {
            DataBean dataBean = (DataBean) o;
            return coordinateX.equals(dataBean.getCoordinateX()) &&
                    coordinateY.equals(dataBean.getCoordinateY()) &&
                    radius.equals(dataBean.getRadius());
        }
        return false;
    }

    @Override
    public int hashCode() {
        return coordinateX.hashCode() + coordinateY.hashCode() +
                radius.hashCode();
    }
}
