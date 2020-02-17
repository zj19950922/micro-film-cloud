package menu;

import com.zjservice.user.NacosUserApplication;
import com.zjservice.user.service.MenuService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import javax.annotation.Resource;

/**
 * @author zj
 * @date 2020/2/12 10:32
 * @Description
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = NacosUserApplication.class)
public class MenuTest {

    @Resource
    private MenuService menuService;

    @Test
    public void test(){
        System.out.println(menuService.queryMenuCascade());
    }

}
