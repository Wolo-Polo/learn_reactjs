FROM openjdk:11
ENV JAVA_HOME /home/jdk-11.0.0
ENV PATH $PATH:/home/jdk-11.0.0/bin
EXPOSE 8080
ADD /target/demo-0.0.1-SNAPSHOT.jar demo.jar
ENTRYPOINT ["java", "-jar", "demo.jar"]
