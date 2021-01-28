# Procedure for deployment
# AWS EC2
# first we need to create instance on AWS EC2
# Steps:-
1. Create account on Aws
Go to https://www.aws.com and create new account on aws. If you are already registered on aws then go to aws console. An AWS new account lets you try the free tier of Amazon EC2, Amazon S3 and Amazon DynamoDb services for 12 months.
Choose personal account type, provide all the required information and fill the signup form.
2. Launch an EC2 instance
Now that the signup process is complete, go to aws console and provide login credentials. Once you are logged in you can see all the aws services under the AWS Services section.
Click on the EC2 Service under Computer Service,it will show us EC2 Dashboard page, on this page just click on Launch Instance button under Create Instance Section.
We have to choose Amazon Machine Image for launching our instance. Amazon provides various types of images, but we will stick with Ubuntu 18.04. It is more secure and 70 servers are using different versions of linux operating system.
Select Ubuntu 18.04 for image for our  machine. After selecting the machine, we have to configure our machine (you can skip all these next steps and launch instance directly). Click on Next Add Storage button.
Select default storage configuration and click the Next Add Tags button.
Now, we can see the Add Tags page. In this section, we have to add at least single tag using key-value pairs. For example, you can add Key=ServerName and value=Nodejs_Server. After adding tag click on Next: Configure Security Group Button.
After adding these tags we have to open some ports of our server to communicate with outer world. We can also configure these ports after launching the server. Click on Add Tag button and add 80, 8080, and 22 ports.
Click on Next Review and Launch button.
Now we are very close to launching our EC2 server. Click on the Launch Button and we will see a dialog box. Create a new key pair and download it on your local machine. You can not generate this key after launching your instance.
After generating the key pair click on Launch Instances button.
3. SSH into your instance
So we have successfully launched our EC2 server. Now we will access the server from our local machine using terminal on Linux and putty on Windows. If you are using Windows you need to change your .pem key to .ppk format. You can follow this link to convert your key. Go to your local directory where you downloaded the private key. Go to AWS instances console and click on the Connect button and follow the simple steps.

Congratulations! You're connected with your EC2 remote server.

# After created server instance then we need to follow these steps for deployment our latest code to server.

# For Mac OS
If already done first step then start from 2nd step:

1. Create .ssh directory
    i. Open terminal / command prompt
    ii. Enter cd ~
    iii. Enter mkdir .ssh; chmod 700 ~/.ssh
    iv. cd ~/.ssh
    v. Add pem file from AWS Server

2. Open .ssh folder in terminal
Using shortcut key:-   window+shift+g

3. Run commands:
   (i) chmod 400 <pem filename with extension> if you are doing first time
   (ii) ssh -i <pem filename with extension> ubuntu@<server ip address>
   (iii) cd /opt/
   (iv) cd project_repo_name/
   (v) sudo git pull
   (vi) Enter your password
   (vii) pm2 stop all (please install pm2 if we don't have pm2 package)
   (viii) pm2 start all
   (ix) pm2 logs optional if you are interested to see all api calls


# For Windows
for reference https://linuxacademy.com/guide/17385-use-putty-to-access-ec2-linux-instances-via-ssh-from-windows/

Download and Install Putty (.msi)
https://www.chiark.greenend.org.uk/~sgtatham/putty/latest.html
Open PuTTYgen 
 Click on Load button
Browse pem file and open it
Select SSH option
 Click on Save private key button
 Click on Yes button
 Enter name and save it
 Open PuTTY 
 Enter ip address of backend server with user-name
    (i) ubuntu@<server ip address>
    (ii) Next, click on the + button next to the SSH field to expand this section. Then         

click on Auth (which stands for authenticate) and enter the name of your private key file (i.e. the ppk file) where it says Private key file for authentication (if you click on browse you can easily search for the directory where you have stored it).
11. Click on Open button
12. Run commands:
     (i) cd /opt/
     (ii) cd project_repo_name/
     (iii) sudo git pull
     (iv) Enter your password
     (v) pm2 stop all (please install pm2 if we don't have pm2 package)
     (vii) pm2 start all
     (viii) pm2 logs optional if you are interested to see all api calls

