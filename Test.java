import java.util.*;

public class Test
{
  public static void main(String[] args)
  {
    Scanner key = new Scanner(System.in);
    if(args.length > 0)
    {
      int age = Integer.parseInt(args[0]);
      String name = args[1];
      System.out.println("Hello " + name + ", you are " + age + " years old!");
    }
    else
    {
      System.out.println("Enter your age: ");
      int age = key.nextInt();
      key.nextLine();
      System.out.println("Enter your name:");
      String name = key.nextLine();
      System.out.println("Hello " + name + ", you are " + age + " years old!");
    }
  }
}
