#:package SixLabors.ImageSharp@3.1.5

using SixLabors.ImageSharp;
using SixLabors.ImageSharp.Processing;

if (args.Length < 1)
{
    Console.WriteLine("Usage: dotnet run createThumbNails.cs 300");
    Console.WriteLine("Example: dotnet run createThumbNails.cs 300 200");
    Console.WriteLine();
    Console.WriteLine("This will create thumbnails of all images in the covers directory.");
    Console.WriteLine("Output will be saved to ../thumbs/");
    return;
}

int targetWidth = int.Parse(args[0]);
int targetHeight = args.Length > 1 ? int.Parse(args[1]) : targetWidth;

string coversDirectory = Directory.GetCurrentDirectory();
string parentDirectory = Directory.GetParent(coversDirectory)!.FullName;
string outputDirectory = Path.Combine(parentDirectory, "thumbs");

if (!Directory.Exists(outputDirectory))
{
    Directory.CreateDirectory(outputDirectory);
}

string[] imageExtensions = { "*.png", "*.jpg", "*.jpeg", "*.gif", "*.bmp", "*.webp" };
int count = 0;

Console.WriteLine($"Processing images from: {coversDirectory}");
Console.WriteLine($"Output directory: {outputDirectory}");
Console.WriteLine();

foreach (string extension in imageExtensions)
{
    foreach (string filePath in Directory.GetFiles(coversDirectory, extension))
    {
        string fileName = Path.GetFileName(filePath);
        string fileNameWithoutExt = Path.GetFileNameWithoutExtension(filePath);
        string fileExtension = Path.GetExtension(filePath);

        // Replace "cover" with "thumb" in filename
        string newFileName = fileNameWithoutExt.Replace("cover", "thumb", StringComparison.OrdinalIgnoreCase) + fileExtension;
        string outputPath = Path.Combine(outputDirectory, newFileName);

        try
        {
            using var image = Image.Load(filePath);

            double aspectRatio = (double)image.Width / image.Height;
            int newWidth, newHeight;

            if (image.Width > image.Height)
            {
                newWidth = targetWidth;
                newHeight = (int)(targetWidth / aspectRatio);
            }
            else
            {
                newHeight = targetHeight;
                newWidth = (int)(targetHeight * aspectRatio);
            }

            image.Mutate(x => x.Resize(newWidth, newHeight));
            image.Save(outputPath);

            Console.WriteLine($"✓ Created: {newFileName} ({newWidth}x{newHeight})");
            count++;
        }
        catch (Exception ex)
        {
            Console.WriteLine($"✗ Error: {fileName}: {ex.Message}");
        }
    }
}

Console.WriteLine();
Console.WriteLine($"Total thumbnails created: {count}");
