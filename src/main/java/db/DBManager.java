package db;


import beans.DataBean;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;
import validtion.ValidatorHit;
import validtion.ValidatorInput;

import java.util.List;

public class DBManager {

    private final SessionFactory sessionFactory = new Configuration()
            .configure("hibernate.cfg.xml")
            .addAnnotatedClass(DataBean.class)
            .buildSessionFactory();


    private DataBean dataBean;
    private ValidatorHit validatorHit;
    private ValidatorInput validatorInput;

    public DBManager(DataBean dataBean, ValidatorHit validatorHit, ValidatorInput validatorInput) {
        this.dataBean = dataBean;
        this.validatorHit=validatorHit;
        this.validatorInput=validatorInput;
    }

    public void start(DataBean dataBean){
        boolean correctRequest=validatorInput.validateInput(dataBean);
        if(correctRequest) {
            dataBean.setHitResult(validatorHit.validateHit(dataBean));
        }else{
            System.out.println("Wrong input data!");
        }
    }

    public void addElement(DataBean dataBean){
        Session session = sessionFactory.getCurrentSession();
        session.beginTransaction();
        session.save(dataBean);
        session.getTransaction().commit();
        session.close();
    }

    public void deleteAllElements() {
        Session session = sessionFactory.getCurrentSession();
        session.beginTransaction();
        session.createQuery("delete from DataBean").executeUpdate();
        session.getTransaction().commit();
        session.close();
    }

    public  List<DataBean> getAllElements() {

            Session session = sessionFactory.getCurrentSession();
            session.beginTransaction();
            List<DataBean> data = session.createQuery("from DataBean").getResultList();
            session.getTransaction().commit();
            session.close();
            return data;


    }





}
