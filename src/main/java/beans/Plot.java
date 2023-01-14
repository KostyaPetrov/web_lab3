package beans;


import db.DBManager;
import validtion.ValidatorHit;
import validtion.ValidatorInput;

import javax.faces.bean.ApplicationScoped;
import javax.faces.bean.ManagedBean;
import java.util.List;

@ManagedBean
@ApplicationScoped
public class Plot {
    private DataBean dataBean;


    private final ValidatorInput validatorInput=new ValidatorInput();
    private final ValidatorHit validatorHit=new ValidatorHit();
    private final DBManager dbManager=new DBManager(dataBean, validatorHit, validatorInput);


    public Plot() {
        dataBean=new DataBean();
    }

    public DataBean getDataBean() {
        return dataBean;
    }

    public void setDataBean(DataBean dataBean) {
        this.dataBean = dataBean;
    }

    public DBManager getDbManager() {
        return dbManager;
    }

    public List<DataBean> getAllDataBean(){

        return dbManager.getAllElements();
    }


    public void createLineData(){
        dbManager.start(dataBean);
        dbManager.addElement(dataBean);
    }



}
