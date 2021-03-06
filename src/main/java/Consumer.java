/*
 * This Java source file was generated by the Gradle 'init' task.
 */
import com.realexpayments.hpp.sdk.RealexHpp;
import com.realexpayments.hpp.sdk.domain.HppResponse;

public class Consumer {

    public String responseFromJson(String json){
		RealexHpp realexHpp = new RealexHpp("secret");
        HppResponse hppResponse = realexHpp.responseFromJson(json); 
        return realexHpp.responseToJson(hppResponse);
    }

    public static void main(String[] args) {
        System.out.println("realex_start");
        System.out.println(new Consumer().responseFromJson(args[0]));
        System.out.println("realex_end");
    }
}
