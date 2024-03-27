def fetch_user_info_from_email(email):
    
    filename = f"generations/{email}_resume.txt"

    try:
        with open(filename, 'r',encoding='utf-8') as file:
            content = file.read()

        words = content.split()
        selected_words = ' '.join(words[:400])
        print(selected_words)
        return selected_words
    
    except FileNotFoundError:
        print(f"Resume file for {email} not found.")
        return f"Resume file for {email} not found."
    
    except Exception as e:
        error = f"An error occurred: {str(e)}"
        print(error)
        return error


if __name__ == "__main__":
    fetch_user_info_from_email("None")