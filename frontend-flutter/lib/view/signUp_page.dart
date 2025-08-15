import 'package:flutter/material.dart';
import 'package:lottie/lottie.dart';

import '../services/auth_service.dart';
import '../services/constants/details.dart';
import '../utils/app_colors.dart';
import '../utils/customSnackbar.dart';
import 'login_page.dart';
class SignUp extends StatefulWidget {
  const SignUp({super.key});

  @override
  State<SignUp> createState() => _SignUpState();
}

class _SignUpState extends State<SignUp> {
  final username = TextEditingController();
  final password = TextEditingController();
  final confirmPassword = TextEditingController();

  final formKey = GlobalKey<FormState>();

  bool isVisible = false;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: SingleChildScrollView(
          child: Form(
            key: formKey,
            child: Padding(
              padding: const EdgeInsets.all(8.0),
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  const ListTile(
                    title: Text(
                      "Register New Account",
                      style:
                      TextStyle(fontSize: 20, fontWeight: FontWeight.bold, color: AppColors.appColor),
                    ),
                  ),

                  Container(
                    margin: EdgeInsets.all(8),
                    padding:
                     EdgeInsets.symmetric(horizontal: 10, vertical: 6),
                    decoration: BoxDecoration(
                      border: Border.all(
                        color: AppColors.appColor,
                        width: 3.0,        // Set the border width
                      ),
                      borderRadius: BorderRadius.circular(10.0),
                      ),
                    child: TextFormField(
                      controller: username,
                      validator: (value) {
                        if (value!.isEmpty) {
                          return "username is required";
                        }
                        return null;
                      },
                      decoration: const InputDecoration(
                        icon: Icon(Icons.person, color: AppColors.appColor,),
                        border: InputBorder.none,
                        hintText: "Username",
                      ),
                    ),
                  ),

                  //Password field
                  Container(
                    margin: const EdgeInsets.all(8),
                    padding:
                    const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
                    decoration: BoxDecoration(
                      border: Border.all(
                        color: AppColors.appColor,
                        width: 3.0,        // Set the border width
                      ),
                      borderRadius: BorderRadius.circular(10.0),
                    ),
                    child: TextFormField(
                      controller: password,
                      validator: (value) {
                        if (value!.isEmpty) {
                          return "password is required";
                        }
                        return null;
                      },
                      obscureText: !isVisible,
                      decoration: InputDecoration(
                          icon: const Icon(Icons.lock, color: AppColors.appColor,),
                          border: InputBorder.none,
                          hintText: "Password",
                          suffixIcon: IconButton(
                              onPressed: () {
                                setState(() {
                                  isVisible = !isVisible;
                                });
                              },
                              icon: Icon(isVisible
                                  ? Icons.visibility
                                  : Icons.visibility_off))),
                    ),
                  ),

                  Container(
                    margin: const EdgeInsets.all(8),
                    padding:
                    const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
                    decoration: BoxDecoration(
                      border: Border.all(
                        color: AppColors.appColor,
                        width: 3.0,        // Set the border width
                      ),
                      borderRadius: BorderRadius.circular(10.0),
                    ),
                    child: TextFormField(
                      decoration: InputDecoration(
                          icon: const Icon(Icons.email, color: AppColors.appColor,),
                          border: InputBorder.none,
                          hintText: "Email",
                      ),
                    ),
                  ),

                  const SizedBox(height: 10),
                  //Login button
                  Container(
                    height: 55,
                    width: MediaQuery.of(context).size.width * .9,
                    decoration: BoxDecoration(
                        borderRadius: BorderRadius.circular(8),
                        color: AppColors.appColor),
                    child: TextButton(
                        onPressed: () async {
                          if (formKey.currentState!.validate()) {
                            try {
                              await authService.signup(
                                username: username.text.trim(),
                                password: password.text.trim(),
                                // email: emailController.text.trim() if you added it
                              );
                              Navigator.pop(context); // go back to login
                              CustomSnackBar.show(context, "Registration successful", Icons.check, AppColors.appColor);
                            } catch (e) {
                              print(Text(e.toString()));
                            }
                          }
                        },
                        child: const Text(
                          "SIGN UP",
                          style: TextStyle(color: Colors.white),
                        )),
                  ),

                  Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      const Text("Already have an account?"),
                      TextButton(
                          onPressed: () {
                            //Navigate to sign up
                            Navigator.push(
                                context,
                                MaterialPageRoute(
                                    builder: (context) => const LoginScreen()));
                          },
                          child: const Text("Login", style: TextStyle(color: AppColors.appColor),))
                    ],
                  )
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
}