import os
import datetime
import sounddevice as sd
import time  # Add this import
import numpy as np
import wave
from faster_whisper import WhisperModel
from gtts import gTTS
import jiwer
import logging
import platform
import subprocess
import numpy as np
from sklearn.metrics import precision_score, recall_score, f1_score

# Configure logging
logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s")

# Function to record audio
def record_audio(duration, output_path, samplerate=16000):
    try:
        logging.info("Recording audio...")
        audio_data = sd.rec(int(duration * samplerate), samplerate=samplerate, channels=1, dtype=np.int16)
        sd.wait()
        
        with wave.open(output_path, 'wb') as wf:
            wf.setnchannels(1)
            wf.setsampwidth(2)  # 16-bit PCM
            wf.setframerate(samplerate)
            wf.writeframes(audio_data.tobytes())
        
        logging.info(f"Recording saved to {output_path}")
        return output_path
    except Exception as e:
        logging.error(f"Error recording audio: {e}")
        return None

# Function to play audio (Cross-platform)
def play_audio(file_path):
    try:
        system_name = platform.system()
        if system_name == "Windows":
            os.startfile(file_path)
        elif system_name == "Darwin":  # macOS
            subprocess.call(["open", file_path])
        else:  # Linux
            subprocess.call(["xdg-open", file_path])
    except Exception as e:
        logging.error(f"Error playing audio: {e}")

# Function to convert text to speech
def text_to_speech(text, output_audio_file):
    try:
        if not text.strip():
            logging.warning("No text to convert to speech.")
            return

        logging.info("Converting text to speech...")
        tts = gTTS(text=text, lang="en", slow=False)
        tts.save(output_audio_file)

        # Ensure file is fully saved before playing
        time.sleep(1)  # Small delay to allow writing to disk
        logging.info(f"TTS Audio saved to: {output_audio_file}")

        # Cross-platform audio playback
        system_name = platform.system()
        if system_name == "Windows":
            subprocess.run(["start", output_audio_file], shell=True)
        elif system_name == "Darwin":  # macOS
            subprocess.run(["open", output_audio_file])
        else:  # Linux
            subprocess.run(["xdg-open", output_audio_file])

    except Exception as e:
        logging.error(f"Error in TTS conversion: {e}")


# Function to calculate Precision, Recall, F1-Score, WER, CER, and Accuracy
from collections import Counter

def evaluate_metrics(ground_truth, transcription):
    # Calculate WER and CER
    wer = jiwer.wer(ground_truth, transcription)
    cer = jiwer.cer(ground_truth, transcription)

    # Convert ground truth and transcription into word sets
    ground_truth_words = ground_truth.lower().strip().split()
    transcription_words = transcription.lower().strip().split()

    # Ensure both lists have the same length by truncating to the shorter one
    min_len = min(len(ground_truth_words), len(transcription_words))
    ground_truth_words = ground_truth_words[:min_len]
    transcription_words = transcription_words[:min_len]

    # Compute binary match: 1 if correct word, 0 if incorrect
    y_true = [1 if word in ground_truth_words else 0 for word in ground_truth_words]
    y_pred = [1 if word in transcription_words else 0 for word in transcription_words]

    # Compute Precision, Recall, and F1-score
    precision = precision_score(y_true, y_pred, average="binary", zero_division=1)
    recall = recall_score(y_true, y_pred, average="binary", zero_division=1)
    f1 = f1_score(y_true, y_pred, average="binary", zero_division=1)

    # Calculate Word Accuracy
    word_matches = sum((Counter(ground_truth_words) & Counter(transcription_words)).values())
    word_accuracy = (word_matches / max(len(ground_truth_words), 1)) * 100  # Avoid division by zero

    # Log evaluation metrics
    logging.info("\n=== Evaluation Metrics ===")
    logging.info(f"WER: {wer:.2f}")
    logging.info(f"CER: {cer:.2f}")
    logging.info(f"Word Accuracy: {word_accuracy:.2f}%")
    logging.info(f"Precision: {precision:.2f}")
    logging.info(f"Recall: {recall:.2f}")
    logging.info(f"F1-Score: {f1:.2f}")

    return wer, cer, word_accuracy, precision, recall, f1


# Function to calculate Consistency Score
def calculate_consistency_score(ground_truth, transcriptions):
    if len(transcriptions) < 2:
        logging.warning("Not enough transcriptions to calculate consistency score.")
        return None

    wer_scores = [jiwer.wer(ground_truth, transcription) for transcription in transcriptions]
    consistency_score = 1 - np.std(wer_scores)  # Inverse of standard deviation

    logging.info(f"Consistency Score: {consistency_score:.2f}")
    return consistency_score


# Function to transcribe audio and evaluate accuracy
def transcribe_with_whisper(input_file, output_dir, ground_truth=None):
    try:
        os.makedirs(output_dir, exist_ok=True)

        model = WhisperModel("small", device="cuda", compute_type="float16")

        # Explicitly set language to English ("en") to avoid auto-detection
        segments, _ = model.transcribe(input_file, language="en")
        transcribed_text = " ".join(segment.text for segment in segments)

        # Save transcription
        timestamp = datetime.datetime.now().strftime("%Y-%m-%d_%H-%M-%S")
        output_text_file = os.path.join(output_dir, f"transcription_{timestamp}.txt")
        output_audio_file = os.path.join(output_dir, f"transcription_{timestamp}.mp3")

        with open(output_text_file, "w", encoding="utf-8") as f:
            f.write(transcribed_text)

        logging.info(f"Transcription saved to: {output_text_file}")

        # Evaluate accuracy if ground truth is provided
        if ground_truth:
            wer, cer, word_accuracy, precision, recall, f1 = evaluate_metrics(ground_truth, transcribed_text)
            # If multiple transcriptions are available, calculate consistency
            transcriptions = [transcribed_text]  # Add more transcriptions if available
            calculate_consistency_score(ground_truth, transcriptions)

        # Convert transcribed text to speech
        if transcribed_text.strip():
            text_to_speech(transcribed_text, output_audio_file)
        else:
            logging.warning("No text to convert to speech.")

    except Exception as e:
        logging.error(f"Error in transcription process: {e}")

# Main Execution
def main():
    try:
        print("Choose an option:")
        print("1. Provide an audio file")
        print("2. Record live audio")

        choice = input("Enter 1 or 2: ").strip()

        if choice == "1":
            input_audio_file = input("Enter the path to the audio file: ").strip('"')
            if not os.path.exists(input_audio_file):
                logging.error("File not found. Exiting.")
                return
        elif choice == "2":
            duration = int(input("Enter recording duration in seconds: ").strip())
            temp_audio_file = os.path.join(os.path.expanduser("~"), "recorded_audio.wav")
            input_audio_file = record_audio(duration, temp_audio_file)
            if not input_audio_file:
                logging.error("Recording failed. Exiting.")
                return
        else:
            logging.error("Invalid choice. Exiting.")
            return

        output_directory = input("Enter the output directory: ").strip('"')

        ground_truth = input("Enter the ground truth transcription (or leave blank to skip evaluation): ").strip()

        # Transcribe and evaluate
        transcribe_with_whisper(input_audio_file, output_directory, ground_truth if ground_truth else None)

    except Exception as e:
        logging.error(f"Unexpected error: {e}")

if __name__ == "__main__":
    main()