# Task3

Design Choice:
1. When user type the tasks3.wangluqi.com, redirect to login page
2. The nav bar has four link can click.
  - Tracker: redirect to homepage: Has three button to choose content.
  - Tasks: See all the tasks. On tasks page:
      - if the task's assignee is current user, the user can input time to complete task
      - if the task's creator is current user, the user can edit the task
      - if the task has no relation to current user the user can only read its detail.
  - All Users: see all users information and the tasks every user need todo
  - Log Out: Clear the token and redirect to login page

3. When the user input the time to finish task. The task status will be completed.
  But the user still have chance to change finish time

4. When User Login in, I choose do not clear the login form. This will be convenient for next login
